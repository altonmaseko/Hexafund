const { loginController } = require("../../../controllers");
const { User } = require("../../../models");
const jwt = require("jsonwebtoken");

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
  cookie: jest.fn()
};

describe("Testing the login controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 400 if email or password is missing", async () => {
    const req = {
      body: {}
    };

    await loginController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please enter email AND password",
      status: 400
    });
  });

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

    //expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password",
      status: 404
    });
  });

  /*it("should return status 200 and set jwt cookie when login is successful", async () => {
    const req = {
      body: {
        email: "example@gmail.com",
        password: "password123"
      }
    };

    const existingUser = {
      email: "fun@gmail.com",
      password: "correctEncryptedPassword"
    };

    jest.spyOn(User, "findOne").mockReturnValue({
      exec: jest.fn().mockResolvedValue(existingUser)
    });
    jest.spyOn(User, "updateOne").mockReturnValue({
      updateOne: jest.fn().mockResolvedValue(true)
    });

    const refreshToken = 'validRefreshToken';
    jest.spyOn(jwt, "sign").mockReturnValue(refreshToken);

    await loginController(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(jwt.sign).toHaveBeenCalled();
    expect(User.updateOne).toHaveBeenCalledWith(
      { email: existingUser.email }, 
      { refreshToken: refreshToken }
    );
    expect(res.cookie).toHaveBeenCalledWith("jwt", refreshToken, {
      httpOnly: true,
      maxAge: expect.any(Number)
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      accessToken: expect.any(String),
      name: existingUser.name
    });
  });*/
});