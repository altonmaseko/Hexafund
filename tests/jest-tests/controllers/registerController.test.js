// imports
const registerController = require("../../../controllers/registerController");
const User = require("../../../models/User");
const Applicant = require("../../../models/Applicant");
const FundingManager = require("../../../models/FundingManager");
const bcrypt = require("bcrypt");

const res = {
    status: jest.fn(() => res),
    json: jest.fn()
};

describe("Testing the register controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    /*TEST 1*/
    const json_test_1 = {
        message: "Please ensure you have entered your Name, Email and Password",
        status: 400
    };
    const requests = [
        {
            body: {}
        },
        {
            body: {
                name: "name"
            }
        }, 
        {
            body: {
                email: "example@gmail.com"
            }
        },
        {
            body: {
                password: "password123"
            }
        },
        {
            body: {
                name: "name",
                email: "example@gmail.com"
            }
        },
        {
            body: {
                name: "name",
                password: "password123"
            }
        },
        {
            body: {
                email: "example@gmail.com",
                password: "password123"
            }
        }
    ];
    requests.forEach((req) => {
        it("should return status 400 if name, email or password are not provided", async () => {
            await registerController(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(json_test_1);
        });
    });

    /*TEST 2*/
    const json_test_2 = (email) => {
        return { message: `The email: '${email}' is already taken :)`, status: 409 };
    };
    
    it("should return status 409 when user already exist", async ()=>{    
        const existingUser = {
            email: "example@gmail.com"
        };
      
        User.findOne = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(existingUser)
        });
      
        const req = {
            body: {
                name: "name",
                email: "example@gmail.com",
                password: "password123"
            }
        };
        const expected_response = json_test_2(existingUser.email);
      
        await registerController(req, res);

        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith(expected_response);
    });

    /*TEST 3*/
    const json_test_3 = (email) => {
        return {
            message: `${email} has been successfully registered.`,
            status: 201
        };
    };
  
    it("should return status 201 when a new user (applicant) is created", async () => {
        const req = {
            body: {
                name: "name",
                email: "example@gmail.com",
                password: "password123",
                role: "Applicant"
            }
        };
    
        // Mock the necessary functions and models
        const userCreateMock = jest.fn().mockResolvedValueOnce({
            _id: "user_id",
        });
        jest.spyOn(User, "create").mockImplementation(userCreateMock);
        
        const userFindOneMock = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
        });
        jest.spyOn(User, "findOne").mockImplementation(userFindOneMock);

        const applicantCreateMock = jest.fn().mockResolvedValueOnce({
            _id: "applicant_id",
        });
        jest.spyOn(Applicant, "create").mockImplementation(applicantCreateMock);
        
        const encryptedPassword = 'encryptedPassword';
        jest.spyOn(bcrypt, 'hash').mockResolvedValue(encryptedPassword);
    
        const expectedResponse = json_test_3(req.body.email);
    
        await registerController(req, res);
        
        //expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);
        expect(userCreateMock).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
        });
        expect(userFindOneMock).toHaveBeenCalledWith({ email: req.body.email });
        expect(applicantCreateMock).toHaveBeenCalledWith({
            user_id: expect.any(String), 
            name: req.body.name,
            email: req.body.email
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    it("should return status 201 when a new user (funding manager) is created", async () => {
        const req = {
            body: {
                name: "name",
                email: "example@gmail.com",
                password: "password123",
                company: "company",
                role: "Funding Manager"
            }
        };
    
        jest.spyOn(User, 'create').mockResolvedValue({ _id: 'user_id' }); // Mock the create method as a static method
        jest.spyOn(User, 'findOne').mockReturnValue({
            exec: jest.fn().mockResolvedValue({
                _id: "user_id"
            })
        });
        jest.spyOn(FundingManager, 'create').mockResolvedValue({ _id: 'funding_manager_id' });
    
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const expectedResponse = json_test_3(req.body.email);
    
        await registerController(req, res);
    
        expect(User.create).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPassword,
            role: req.body.role
        });
        expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(FundingManager.create).toHaveBeenCalledWith({
            user_id: "user_id",
            name: req.body.name,
            email: req.body.email,
            company: req.body.company
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
});