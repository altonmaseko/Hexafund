const createApplication = require("../../../controllers/createControllers/createApplicationController");
const { Application } = require("../../../models");

jest.mock("../../../models", () => ({
  Application: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}));

describe("Testing the createApplication controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 400 status code if required fields are missing", async () => {
    const req = {
      body: {
        applicant_email: "test@example.com",
        funding_opportunity_id: "123",
        reason: "",
        contact_number: "123456789",
        cv_data: "CV data",
        application_form_data: "Application form data"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createApplication(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please ensure you have entered the Applicant Email, Funding Opportunity ID, Reason, and Contact Number.",
      status: 400
    });
  });

  /*it("should return a 409 status code if the application already exists", async () => {
    const req = {
      body: {
        applicant_email: "test@example.com",
        funding_opportunity_id: "123",
        reason: "Reason",
        contact_number: "123456789",
        cv_data: "CV data",
        application_form_data: "Application form data"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Application.findOne.mockResolvedValue({ applicant_email: "test@example.com" });

    await createApplication(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "This application by: 'test@example.com' already exists",
      status: 409
    });
  });

  it("should create a new application and return a 201 status code", async () => {
    const req = {
      body: {
        applicant_email: "test@example.com",
        funding_opportunity_id: "123",
        reason: "Reason",
        contact_number: "123456789",
        cv_data: "CV data",
        application_form_data: "Application form data"
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    Application.findOne.mockResolvedValue(null);

    await createApplication(req, res);

    expect(Application.create).toHaveBeenCalledWith({
      applicant_email: "test@example.com",
      funding_opportunity_id: "123",
      reason: "Reason",
      contact_number: "123456789",
      cv_data: "CV data",
      application_form_data: "Application form data"
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Application successfully submitted.",
      status: 201
    });
  });*/
});