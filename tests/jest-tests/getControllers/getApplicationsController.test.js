const { Application } = require("../../../models");
const getApplications = require("./../../../controllers/getControllers/getApplicationsController");

jest.mock("../../../models", () => ({
  Application: {
    find: jest.fn(),
  },
}));

describe("Testing getApplications controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all applications if no query parameters are provided", async () => {
    const req = {
      params: {},
      query: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApplications = [{ id: 1, name: "App 1" }, { id: 2, name: "App 2" }];
    Application.find.mockResolvedValue(mockApplications);

    await getApplications(req, res);

    expect(Application.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockApplications);
  });

  it("should filter applications based on query parameters", async () => {
    const req = {
      params: {},
      query: {
        name: "App 1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApplications = [
      { id: 1, name: "App 1" },
      { id: 2, name: "App 2" },
    ];
    Application.find.mockResolvedValue(mockApplications);

    await getApplications(req, res);

    expect(Application.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "App 1" }]);
  });

  it("should filter applications based on nested query parameters", async () => {
    const req = {
      params: {},
      query: {
        "nested.property": "value",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApplications = [
      { id: 1, nested: { property: "value" } },
      { id: 2, nested: { property: "otherValue" } },
    ];
    Application.find.mockResolvedValue(mockApplications);

    await getApplications(req, res);

    expect(Application.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nested: { property: "value" } }]);
  });
});
