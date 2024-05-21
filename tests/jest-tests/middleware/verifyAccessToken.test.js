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

  it("should return 401 if no authorization header and access token cookie is provided", async () => {
    await verifyAccessToken(req, res, next);

    expect(req.cookies).toEqual({});
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

  it("Checking if access token splits if authToken defined", async () => {
    const accessToken = "validAccessToken";
    req.headers.Authorization = `Bearer ${accessToken}`;

    await verifyAccessToken(req, res, next);

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

  it("should return 401 if authorization header is provided but access token is missing", async () => {
    req.headers.Authorization = "Bearer";

    await verifyAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are forbidden from accessing this resource",
      status: 403,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if access token is provided but is empty", async () => {
    req.headers.Authorization = "Bearer ";

    await verifyAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are forbidden from accessing this resource",
      status: 403,
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if access token is provided but is not a valid JWT", async () => {
    req.headers.Authorization = "Bearer invalidToken";

    await verifyAccessToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "You are forbidden from accessing this resource",
      status: 403,
    });
    expect(next).not.toHaveBeenCalled();
  });

  /*it("should return 403 if access token is valid but does not contain userInfo", async () => {
    const accessToken = "validAccessToken";
    req.headers.Authorization = `Bearer ${accessToken}`;

    const verifyMock = jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
      callback(null, {});
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
  });*/

  it("should extract the token from the Authorization header", async () => {
    const accessToken = "validAccessToken";
    req.headers.Authorization = `Bearer ${accessToken}`;

    jwt.verify = jest.fn((token, secret, callback) => {
      callback(null, { userInfo: { id: 1, username: "testuser" } });
    });

    await verifyAccessToken(req, res, next);

    expect(req.userInfo).toEqual({ id: 1, username: "testuser" });
    expect(next).toHaveBeenCalled();
  });

  it("should extract the token from the accessToken cookie if Authorization header is not present", async () => {
    const accessToken = "validAccessToken";
    req.cookies.accessToken = accessToken;

    jwt.verify = jest.fn((token, secret, callback) => {
      callback(null, { userInfo: { id: 1, username: "testuser" } });
    });

    await verifyAccessToken(req, res, next);

    expect(req.userInfo).toEqual({ id: 1, username: "testuser" });
    expect(next).toHaveBeenCalled();
  });

});
