const { asyncWrapper } = require("../../../middleware");
const { FundingOpportunity } = require("../../../models");
const getFundingController = require("../../../controllers/getControllers/getFundingController");

jest.mock("../../../models", () => ({
  FundingOpportunity: {
    find: jest.fn(),
  },
}));

describe("Testing getFundingController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all funding opportunities if no query parameters are provided", async () => {
    const req = { query: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    FundingOpportunity.find.mockResolvedValueOnce(["fundingOpportunity1", "fundingOpportunity2"]);

    await asyncWrapper(getFundingController)(req, res);

    expect(FundingOpportunity.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(["fundingOpportunity1", "fundingOpportunity2"]);
  });

  it("should filter funding opportunities based on query parameters", async () => {
    const req = { query: { property: "value" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    FundingOpportunity.find.mockResolvedValueOnce([
      { property: "value", otherProperty: "otherValue" },
      { property: "value", otherProperty: "anotherValue" },
    ]);

    await asyncWrapper(getFundingController)(req, res);

    expect(FundingOpportunity.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { property: "value", otherProperty: "otherValue" },
      { property: "value", otherProperty: "anotherValue" },
    ]);
  });

  it("should filter nested properties correctly", async () => {
    const req = { query: { "nestedProperty.nestedKey": "nestedValue" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFundingOpportunities = [
      { nestedProperty: { nestedKey: "nestedValue" }, otherProperty: "otherValue" },
      { nestedProperty: { nestedKey: "nestedValue" }, otherProperty: "anotherValue" },
    ];

    FundingOpportunity.find.mockResolvedValueOnce(mockFundingOpportunities);

    await asyncWrapper(getFundingController)(req, res);

    expect(FundingOpportunity.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFundingOpportunities);
  });
  
  // New test case for filtering nested properties
  it("should filter funding opportunities based on nested query parameters", async () => {
    const req = { query: { "nestedProperty.nestedKey": "nestedValue" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    const mockFundingOpportunities = [
      { nestedProperty: { nestedKey: "nestedValue" }, otherProperty: "otherValue" },
      { nestedProperty: { nestedKey: "nestedValue" }, otherProperty: "anotherValue" },
      { nestedProperty: { nestedKey: "otherNestedValue" }, otherProperty: "anotherValue" }, // Add another opportunity with a different nested value
    ];
  
    FundingOpportunity.find.mockResolvedValueOnce(mockFundingOpportunities);
  
    await asyncWrapper(getFundingController)(req, res);
  
    expect(FundingOpportunity.find).toHaveBeenCalledWith({});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { nestedProperty: { nestedKey: "nestedValue" }, otherProperty: "otherValue" },
      { nestedProperty: { nestedKey: "nestedValue" }, otherProperty: "anotherValue" },
    ]);
  });
});
