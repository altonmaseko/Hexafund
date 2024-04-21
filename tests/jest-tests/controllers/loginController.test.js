// imports
const loginController = require("../../../controllers/loginController");
const User = require("../../../models/User");
const bcrypt = require("bcrypt");

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
  cookie: jest.fn()
};

describe("Testing the login controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*TEST 1*/
  const json_test_1 = {
    message: "Please enter email AND password",
    status: 400
  };
  const requests = [
    {
      body: {}
    },
    {
      body: {
        email: "example@gmail.coms"
      }
    },
    {
      body: {
        password: "password123"
      }
    }
  ];
  requests.forEach((req) => {
    it("should return status 400 if email or password is missing", async () => {
      await loginController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(json_test_1);
    });
  });
  
  /*TEST 2*/
  it("should return status 404 if user is not found", async () => {
    const req = {
      body: {
        email: "example@gmail.com",
        password: "password123"
      }
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(null)
    });

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password",
      status: 404
    });
  });

  /*TEST 3*/
  it("should return status 401 if password is incorrect", async () => {
    const req = {
      body: {
        email: "example@gmail.com",
        password: "incorrectPassword"
      }
    };

    const existingUser = {
      email: "example@gmail.com",
      password: await bcrypt.hash("password123", 10)
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(existingUser)
    });

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password",
      status: 401
    });
  });

  /*TEST 4*/
  it("should return status 200 and set jwt cookie when login is successful", async () => {
    const req = {
      body: {
        email: "example@gmail.com",
        password: "password123"
      }
    };

    const existingUser = {
      email: "example@gmail.com",
      password: await bcrypt.hash("password123", 10),
      save: jest.fn()
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(existingUser)
    });

    await loginController(req, res);

    expect(existingUser.refreshToken).toEqual(expect.any(String));
    expect(existingUser.save).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith("jwt", existingUser.refreshToken, {
      httpOnly: true,
      maxAge: expect.any(Number)
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      accessToken: expect.any(String)
    });
  });
});