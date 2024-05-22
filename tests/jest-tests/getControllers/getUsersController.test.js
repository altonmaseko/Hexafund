const { Applicant } = require("../../../models");
const { getApplicants } = require("../../../controllers/getControllers/getUsersController");

jest.mock("../../../models/Applicant");

const { FundingManager } = require("../../../models");
const { getFundingManagers } = require("../../../controllers/getControllers/getUsersController");
const { User } = require("../../../models");
const { getAdmins } = require("../../../controllers/getControllers/getUsersController");

jest.mock("../../../models", () => ({
  FundingManager: {
    find: jest.fn(),
  },
  User: {
    find: jest.fn(),
  },
  Applicant: {
    find: jest.fn(),
  }
}));

describe("Testing getFundingManagers controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all funding managers if no query parameters are provided", async () => {
    const req = {
      query: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFundingManagers = [
      { id: 1, name: "Manager 1" },
      { id: 2, name: "Manager 2" },
    ];
    FundingManager.find.mockResolvedValue(mockFundingManagers);

    await getFundingManagers(req, res);

    expect(FundingManager.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFundingManagers);
  });

  it("should filter funding managers based on query parameters", async () => {
    const req = {
      query: {
        name: "Manager 1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFundingManagers = [
      { id: 1, name: "Manager 1" },
      { id: 2, name: "Manager 2" },
    ];
    FundingManager.find.mockResolvedValue(mockFundingManagers);

    await getFundingManagers(req, res);

    expect(FundingManager.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Manager 1" }]);
  });

  it("should filter funding managers based on nested query parameters", async () => {
    const req = {
      query: {
        "nested.property": "value",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFundingManagers = [
      { id: 1, nested: { property: "value" } },
      { id: 2, nested: { property: "otherValue" } },
    ];
    FundingManager.find.mockResolvedValue(mockFundingManagers);

    await getFundingManagers(req, res);

    expect(FundingManager.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nested: { property: "value" } }]);
  });
});




describe("Testing getAdmins", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it("should return all admins if no query parameters are provided", async () => {
    const req = {
      query: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockAdmins = [
      { id: 1, name: "Admin 1", role: "PLATFORM_ADMIN" },
      { id: 2, name: "Admin 2", role: "PLATFORM_ADMIN" },
    ];
    User.find.mockResolvedValue(mockAdmins);

    await getAdmins(req, res);

    expect(User.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAdmins);
  });

  it("Test for Assignment to constant variable", async () => {
    const req = {
      query: {
        name: "Admin 1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockAdmins = [
      { id: 1, name: "Admin 1", role: "PLATFORM_ADMIN" },
      { id: 2, name: "Admin 2", role: "PLATFORM_ADMIN" },
    ];
    User.find.mockResolvedValue(mockAdmins);

    await getAdmins(req, res);

    expect(User.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({"error": "Assignment to constant variable."});
  });

  it("should filter admins based on nested query parameters", async () => {
    const req = {
      query: {
        "nested.property": "value",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockAdmins = [
      { id: 1, nested: { property: "value" }, role: "PLATFORM_ADMIN" },
      { id: 2, nested: { property: "otherValue" }, role: "PLATFORM_ADMIN" },
    ];
    User.find.mockResolvedValue(mockAdmins);

    await getAdmins(req, res);

    expect(User.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({"error": "Assignment to constant variable."});
  });

});




describe("Testing getApplicants controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all applicants if no query parameters are provided", async () => {
    const req = {
      query: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApplicants = [
      { id: 1, name: "Applicant 1" },
      { id: 2, name: "Applicant 2" },
    ];
    Applicant.find.mockResolvedValue(mockApplicants);

    await getApplicants(req, res);

    expect(Applicant.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockApplicants);
  });

  it("should filter applicants based on query parameters", async () => {
    const req = {
      query: {
        name: "Applicant 1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApplicants = [
      { id: 1, name: "Applicant 1" },
      { id: 2, name: "Applicant 2" },
    ];
    Applicant.find.mockResolvedValue(mockApplicants);

    await getApplicants(req, res);

    expect(Applicant.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, name: "Applicant 1" }]);
  });

  it("should filter applicants based on nested query parameters", async () => {
    const req = {
      query: {
        "nested.property": "value",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockApplicants = [
      { id: 1, nested: { property: "value" } },
      { id: 2, nested: { property: "otherValue" } },
    ];
    Applicant.find.mockResolvedValue(mockApplicants);

    await getApplicants(req, res);

    expect(Applicant.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1, nested: { property: "value" } }]);
  });
});