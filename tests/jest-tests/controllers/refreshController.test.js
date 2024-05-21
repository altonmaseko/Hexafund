const { User } = require("../../../models");
const jwt = require("jsonwebtoken");
const refreshController = require("../../../controllers/refreshController");

describe("Testing the refresh controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return status 401 if cookies object is missing", async () => {
    const req = {
      cookies: null
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await refreshController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are unauthorized from accessing this resource",
      status: 401
    });
  });

  it("should return status 401 if refresh token is missing", async () => {
    const req = {
      cookies: {}
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await refreshController(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are unauthorized from accessing this resource",
      status: 401
    });
  });

  it("should return status 403 if user is not found with the refresh token", async () => {
    const req = {
      cookies: {
        jwt: "validRefreshToken"
      }
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    User.find = jest.fn().mockResolvedValue(null);

    await refreshController(req, res);

    expect(User.find).toHaveBeenCalledWith({ refreshToken: req.cookies.jwt });
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are forbidden from accessing this resource.",
      status: 403
    });
  });

  it("should return status 403 if the name in the refresh token does not match the user's name", async () => {
    const req = {
      cookies: {
        jwt: "validRefreshToken"
      }
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    const user = {
      name: "John",
      email: "john@example.com"
    };

    User.find = jest.fn().mockResolvedValue(user);

    jwt.verify = jest.fn((token, secret, callback) => {
      const decoded = {
        name: "Jane"
      };
      callback(null, decoded);
    });

    await refreshController(req, res);

    expect(User.find).toHaveBeenCalledWith({ refreshToken: req.cookies.jwt });
    expect(jwt.verify).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are forbidden from accessing this resource.",
      status: 403
    });
  });

  it("should return a new access token if the refresh token is valid", async () => {
    const req = {
      cookies: {
        jwt: "validRefreshToken"
      }
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    const user = {
      name: "John",
      email: "john@example.com"
    };

    User.find = jest.fn().mockResolvedValue(user);

    jwt.verify = jest.fn((token, secret, callback) => {
      const decoded = {
        name: "John"
      };
      callback(null, decoded);
    });

    jwt.sign = jest.fn(() => "newAccessToken");

    await refreshController(req, res);

    expect(User.find).toHaveBeenCalledWith({ refreshToken: req.cookies.jwt });
    expect(jwt.verify).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      accessToken: "newAccessToken"
    });
  });
});
