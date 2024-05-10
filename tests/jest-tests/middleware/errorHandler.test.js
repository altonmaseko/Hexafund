const errorHandler = require("../../../middleware/errorHandler");

const res = {
  status: jest.fn(() => res),
  json: jest.fn()
};

describe("Testing the errorHandler middleware", () => {
  it("should log the error message and return a 500 status code with error details", () => {
    const err = new Error("Test error");

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    errorHandler(err, {}, res, {});

    expect(consoleSpy).toHaveBeenCalledWith("an error has occured: Test error");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ name: "Error", message: "Test error" });

    consoleSpy.mockRestore();
  });
});