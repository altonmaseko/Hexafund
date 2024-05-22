const { registerController } = require("../../../controllers");
const { User, Applicant, FundingManager, Company } = require("../../../models");

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
    
        const expectedResponse = json_test_3(req.body.email);
    
        await registerController(req, res);
        
        expect(userCreateMock).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        expect(userFindOneMock).toHaveBeenCalledWith({ email: req.body.email });

        expect(applicantCreateMock).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email
        });
        
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });

    /*TEST 4*/
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

        // Mock the necessary functions and models
        const userCreateMock = jest.fn().mockResolvedValueOnce({
            _id: "user_id",
        });
        jest.spyOn(User, "create").mockImplementation(userCreateMock);

        const userFindOneMock = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
        });
        jest.spyOn(User, "findOne").mockImplementation(userFindOneMock);

        const fundingManagerCreateMock = jest.fn().mockResolvedValueOnce({
            _id: "funding_manager_id",
        });
        jest.spyOn(FundingManager, "create").mockImplementation(fundingManagerCreateMock);

        const companyFindOneMock = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
        });
        jest.spyOn(Company, "findOne").mockImplementation(companyFindOneMock);

        const companyCreateMock = jest.fn().mockResolvedValueOnce({
            _id: "company_id",
        });
        jest.spyOn(Company, "create").mockImplementation(companyCreateMock);

        const companyUpdateOneMock = jest.fn().mockResolvedValueOnce({});
        jest.spyOn(Company, "updateOne").mockImplementation(companyUpdateOneMock);

        await registerController(req, res);

        expect(userCreateMock).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        expect(userFindOneMock).toHaveBeenCalledWith({ email: req.body.email });
        expect(fundingManagerCreateMock).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email,
            company: req.body.company
        });
        expect(companyFindOneMock).toHaveBeenCalledWith({ name: req.body.company });
        expect(companyCreateMock).toHaveBeenCalledWith({ name: req.body.company });
        expect(companyUpdateOneMock).toHaveBeenCalledWith(
            { name: req.body.company },
            { $push: { funding_managers: req.body.email } }
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: `${req.body.email} has been successfully registered.`,
            status: 201
        });
    });

    it("should create a new company if the company does not exist", async () => {
        const req = {
            body: {
                name: "name",
                email: "example@gmail.com",
                password: "password123",
                company: "company132321312",
                role: "Funding Manager"
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
    
        const fundingManagerCreateMock = jest.fn().mockResolvedValueOnce({
            _id: "funding_manager_id",
        });
        jest.spyOn(FundingManager, "create").mockImplementation(fundingManagerCreateMock);
    
        const companyFindOneMock = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(null),
        });
        jest.spyOn(Company, "findOne").mockImplementation(companyFindOneMock);
    
        const companyCreateMock = jest.fn().mockResolvedValueOnce({
            _id: "company_id",
        });
        jest.spyOn(Company, "create").mockImplementation(companyCreateMock);
    
        const companyUpdateOneMock = jest.fn().mockResolvedValueOnce({});
        jest.spyOn(Company, "updateOne").mockImplementation(companyUpdateOneMock);
    
        await registerController(req, res);
    
        expect(userCreateMock).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        expect(userFindOneMock).toHaveBeenCalledWith({ email: req.body.email });
        expect(fundingManagerCreateMock).toHaveBeenCalledWith({
            name: req.body.name,
            email: req.body.email,
            company: req.body.company
        });
        expect(companyFindOneMock).toHaveBeenCalledWith({ name: req.body.company });
        expect(companyCreateMock).toHaveBeenCalledWith({ name: req.body.company });
        expect(companyUpdateOneMock).toHaveBeenCalledWith(
            { name: req.body.company },
            { $push: { funding_managers: req.body.email } }
        );
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: `${req.body.email} has been successfully registered.`,
            status: 201
        });
    });
});
