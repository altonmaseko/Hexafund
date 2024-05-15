const verifyAccessToken = require("../../../middleware/verifyAccessToken");
const jwt = require("jsonwebtoken");

describe("Testing the verifyAccessToken middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {},
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should return 401 if no authorization header or access token cookie is provided", async () => {
    await verifyAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are unauthorized to access this resource",
      status: 401,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if authorization header is provided but does not start with 'Bearer'", async () => {
    req.headers.Authorization = "InvalidToken";

    await verifyAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are forbidden from accessing this resource",
      status: 403,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should verify the access token and call next if it is valid", async () => {
    const accessToken = "validAccessToken";
    req.headers.Authorization = `Bearer ${accessToken}`;

    const decodedUserInfo = { id: 1, username: "testuser" };
    const verifyMock = jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(null, { userInfo: decodedUserInfo });
    });

    await verifyAccessToken(req, res, next);

    expect(verifyMock).toHaveBeenCalledWith(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      expect.any(Function)
    );
    expect(req.userInfo).toEqual(decodedUserInfo);
    expect(next).toHaveBeenCalled();
  });

  it("should return 403 if the access token is invalid", async () => {
    const accessToken = "invalidAccessToken";
    req.headers.Authorization = `Bearer ${accessToken}`;

    const verifyMock = jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    await verifyAccessToken(req, res, next);

    expect(verifyMock).toHaveBeenCalledWith(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are forbidden from accessing this resource",
      status: 403,
    });
    expect(next).not.toHaveBeenCalled();
  });
});