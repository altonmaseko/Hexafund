// imports
const { logoutController } = require("../../../controllers");
const { User } = require("../../../models");

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
  clearCookie: jest.fn()
};

describe("Testing the logout controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*TEST 1*/
  it("should return status 204 and 'Already logged out' message if no cookies are present", async () => {
    const req = {};

    await logoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Already logged out",
      status: 204
    });
  });

  it("should return status 204 and 'Already logged out' message if jwt cookie is missing", async () => {
    const req = {
      cookies: {}
    };

    await logoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Already logged out",
      status: 204
    });
  });

  /*TEST 2*/
  it("should return status 204 and clear cookie if user's refreshToken is empty", async () => {
    const req = {
      cookies: {
        jwt: "validRefreshToken"
      }
    };

    const existingUser = {
      refreshToken: ""
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(existingUser)
    });

    await logoutController(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      refreshToken: req.cookies.jwt
    });
    expect(res.clearCookie).toHaveBeenCalledWith("jwt", { httpOnly: true });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Logged out successfully",
      status: 204
    });
  });

  /*TEST 3*/
  it("should return status 200 and clear cookie if user's refreshToken is present", async () => {
    const req = {
      cookies: {
        jwt: "validRefreshToken"
      }
    };

    const existingUser = {
      refreshToken: "validRefreshToken",
      save: jest.fn()
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(existingUser)
    });

    await logoutController(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      refreshToken: req.cookies.jwt
    });
    expect(existingUser.refreshToken).toBe("");
    expect(existingUser.save).toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalledWith("jwt", { httpOnly: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Logged out successfully",
      status: 200
    });
  });
});describe("Testing the logout controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /*TEST 1*/
  it("should return status 204 and 'Already logged out' message if no cookies are present", async () => {
    const req = {};

    await logoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Already logged out",
      status: 204
    });
  });

  it("should return status 204 and 'Already logged out' message if jwt cookie is missing", async () => {
    const req = {
      cookies: {}
    };

    await logoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Already logged out",
      status: 204
    });
  });

  /*TEST 2*/
  it("should return status 204 and clear cookie if user's refreshToken is empty", async () => {
    const req = {
      cookies: {
        jwt: "validRefreshToken"
      }
    };

    const existingUser = {
      refreshToken: ""
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(existingUser)
    });

    await logoutController(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      refreshToken: req.cookies.jwt
    });
    expect(res.clearCookie).toHaveBeenCalledWith("jwt", { httpOnly: true });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({
      message: "Logged out successfully",
      status: 204
    });
  });

  /*TEST 3*/
  it("should return status 200 and clear cookie if user's refreshToken is present", async () => {
    const req = {
      cookies: {
        jwt: "validRefreshToken"
      }
    };

    const existingUser = {
      refreshToken: "validRefreshToken",
      save: jest.fn()
    };

    User.findOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(existingUser)
    });

    await logoutController(req, res);

    expect(User.findOne).toHaveBeenCalledWith({
      refreshToken: req.cookies.jwt
    });
    expect(existingUser.refreshToken).toBe("");
    expect(existingUser.save).toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalledWith("jwt", { httpOnly: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Logged out successfully",
      status: 200
    });
  });
});