const updateApplication = require("../../../controllers/updateControllers/updateApplicationController");
const { Application } = require("../../../models");

jest.mock("../../../models", () => ({
  Application: {
    updateOne: jest.fn()
  }
}));

describe("Testing the updateApplication controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if application_id is not provided in the URL", async () => {
    const req = { params: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateApplication(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please include application_id in url. e.g: api/v1/application/example_id",
      status: 400
    });
  });

  it("should return 400 if the request body is empty", async () => {
    const req = { params: { application_id: "example_id" }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateApplication(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please include a body of the properties you want to modify",
      status: 400
    });
  });

  it("should update the application and return a success message", async () => {
    const req = { params: { application_id: "example_id" }, body: { property: "value" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateApplication(req, res);

    expect(Application.updateOne).toHaveBeenCalledWith({ _id: "example_id" }, { $set: { property: "value" } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Successfully updated",
      success: true,
      data: { property: "value" }
    });
  });
});