const { FundingOpportunity } = require("../../../models");
const createFundingController = require("../../../controllers/createControllers/createFundingController");

describe("Testing createFundingController", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Title",
        company_name: "Test Company",
        funding_manager_email: "test@example.com",
        type: "Test Type",
        admin_status: "Test Status",
        funding_amount: 1000,
        available_slots: 10,
        deadline: "2022-01-01",
        description: "Test Description",
        image_data: "Test Image Data",
      },
    };

    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if required fields are missing", async () => {
    req.body.title = "";
    await createFundingController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "Please ensure you have entered the Title, Company Name, Funding Manager Email and Type",
      status: 400,
    });
  });

  /*it("should return 409 if duplicate funding opportunity exists", async () => {
    FundingOpportunity.findOne = jest.fn().mockResolvedValue({
      title: "Test Title",
    });

    await createFundingController(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "The Funding Opportunity: 'Test Title' already exists",
      status: 409,
    });
  });

  it("should create a new funding opportunity and return 201", async () => {
    FundingOpportunity.findOne = jest.fn().mockResolvedValue(null);
    FundingOpportunity.create = jest.fn().mockResolvedValue();

    await createFundingController(req, res);

    expect(FundingOpportunity.create).toHaveBeenCalledWith({
      title: "Test Title",
      company_name: "Test Company",
      funding_manager_email: "test@example.com",
      type: "Test Type",
      admin_status: "Test Status",
      funding_amount: 1000,
      available_slots: 10,
      deadline: "2022-01-01",
      description: "Test Description",
      image_data: "Test Image Data",
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Test Title has been successfully created.",
      status: 201,
    });
  });*/
});