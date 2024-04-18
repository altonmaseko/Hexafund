

const registerController = require("../../controllers/registerController")
const User = require("../../models/User")
const bcrypt = require("bcrypt")

// jest.mock("../../models/User.js")

// jest.mock("../../models/User.js", ()=>({
//     findOne: jest.fn().mockReturnValue({
//         exec: jest.fn().mockResolvedValue(true)
//     })
// }))

const res = {
    status: jest.fn((x) => res),
    json: jest.fn()
}

const req = { 
    body: {
        name: "something",
        password: "something",
        email: "something"
    }
} 


describe("Testing the register controller", ()=>{

    it("should return status 400 if email, password or name is not provided", () => {

        const req = { //missing name
            body: {
                name: "name",
                // password: "password123",
                email: "example@gmail.com"
            }
        }

        registerController(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalled()

    })

    

    it("should return status 409 when user already exist", async ()=>{
        
        
        User.findOne = jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(true)
        })

        await registerController(req, res)

        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.json).toHaveBeenCalled()

    })

    it("User.create should be called if details are new", async ()=>{

    })

    it("should return status 201 if user created", ()=>{

    })
   

})

