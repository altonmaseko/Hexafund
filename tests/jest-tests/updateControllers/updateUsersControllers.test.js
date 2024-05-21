const { updateApplicants, updateFundingManagers } = require("../../../controllers/updateControllers/updateUsersController");
const { User, Applicant, FundingManager } = require("../../../models");

const res = {
  status: jest.fn(() => res),
  json: jest.fn()
};

describe("Testing the updateApplicants function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 400 status code and error message if email is not provided", async () => {
    const req = { params: {} };
    await updateApplicants(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please include email in url. e.g: api/v1/applicant/example@gmail.com", status: 400 });
  });

  it("should return a 400 status code and error message if body is empty", async () => {
    const req = { params: { email: "example@gmail.com" }, body: {} };
    await updateApplicants(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please include a body of the properties you want to modify", status: 400 });
  });

  /*it("should update the applicant and user with the provided body", async () => {
    const req = { params: { email: "example@gmail.com" }, body: { account_details: { balance: 200 } } };

    Applicant.findOne = jest.fn().mockResolvedValue({ account_details: { balance: 100 } });

    await updateApplicants(req, res);

    expect(Applicant.updateOne).toHaveBeenCalledWith({ email: "example@gmail.com" }, { $set: { account_details: { balance: 200 } } });
    expect(User.updateOne).toHaveBeenCalledWith({ email: "example@gmail.com" }, { $set: { account_details: { balance: 200 } } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "successfully updated", success: true, data: { account_details: { balance: 200 } } });
  });*/
});

describe("Testing the updateFundingManagers function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a 400 status code and error message if email is not provided", async () => {
    const req = { params: {} };
    await updateFundingManagers(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please include email in url. e.g: api/v1/funding-manager/example@gmail.com", status: 400 });
  });

  it("should return a 400 status code and error message if body is empty", async () => {
    const req = { params: { email: "example@gmail.com" }, body: {} };
    await updateFundingManagers(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please include a body of the properties you want to modify", status: 400 });
  });

  /*it("should update the funding manager and user with the provided body", async () => {
    const req = { params: { email: "fund@gmail.com" }, body: { name: "test" } };
    FundingManager.findOne = jest.fn().mockResolvedValue({ email: "fund@gmail.com"});

    await updateFundingManagers(req, res);

    expect(FundingManager.updateOne).toHaveBeenCalledWith(req.params, { $set: req.body });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "successfully updated", success: true, data: { account_details: { balance: 200 } } });
});*/
});
