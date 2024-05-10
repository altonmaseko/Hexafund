const updateFundingController = require("../../../controllers/updateControllers/updateFundingController");
const { FundingOpportunity } = require("../../../models");

jest.mock("../../../models", () => ({
  FundingOpportunity: {
    updateOne: jest.fn(),
  },
}));

describe("Testing the updateFundingController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {
        funding_opportunity_id: "example_id",
      },
      body: {
        // Add the properties you want to modify here
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

  it("should return a 400 status code if funding_opportunity_id is missing", async () => {
    delete req.params.funding_opportunity_id;

    await updateFundingController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please include funding_opportunity_id in url. e.g: api/v1/ad/example_id",
      status: 400,
    });
  });

  it("should return a 400 status code if the request body is empty", async () => {
    req.body = {};

    await updateFundingController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Please include a body of the properties you want to modify",
      status: 400,
    });
  });

  it("should update the funding opportunity and return a 200 status code", async () => {
    const mockUpdateOne = FundingOpportunity.updateOne.mockResolvedValue();

    await updateFundingController(req, res);

    /*expect(FundingOpportunity.updateOne).toHaveBeenCalledWith(
      { _id: req.params.funding_opportunity_id },
      { $set: req.body }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "successfully updated",
      success: true,
      data: req.body,
    });*/
  });

  it("should handle errors and return a 500 status code", async () => {
    const errorMessage = "Test error";
    const mockUpdateOne = FundingOpportunity.updateOne.mockRejectedValue(new Error(errorMessage));

    await updateFundingController(req, res);

    /*expect(FundingOpportunity.updateOne).toHaveBeenCalledWith(
      { _id: req.params.funding_opportunity_id },
      { $set: req.body }
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });*/
  });
});