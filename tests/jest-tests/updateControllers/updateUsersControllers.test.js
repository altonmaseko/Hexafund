const { updateFundingManagers } = require("../../../controllers/updateControllers/updateUsersController");

describe("Testing the updateFundingManagers function", () => {
  it("should return a 400 status code and error message if email is not provided", async () => {
    const req = { params: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await updateFundingManagers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please include email in url. e.g: api/v1/funding-manager/example@gmail.com", status: 400 });
  });

  it("should return a 400 status code and error message if body is empty", async () => {
    const req = { params: { email: "example@gmail.com" }, body: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await updateFundingManagers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Please include a body of the properties you want to modify", status: 400 });
  });

  /*it("should update the funding manager and user with the provided body", async () => {
    const req = { params: { email: "fund1@gmail.com" }, body: { name: "John Doe" } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    const findOneMock = jest.fn().mockResolvedValue({ account_details: { balance: 100 } });
    const updateOneMock = jest.fn();

    const FundingManager = { findOne: findOneMock, updateOne: updateOneMock };
    const User = { updateOne: updateOneMock };

    jest.mock("../../../controllers/updateControllers/updateUsersController", () => ({
      FundingManager,
      User
    }));

    await updateFundingManagers(req, res);

    expect(updateOneMock).toHaveBeenCalledWith({ email: "example@gmail.com" }, { $set: { name: "John Doe" } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "successfully updated", success: true, data: { name: "John Doe" } });
  });*/
});