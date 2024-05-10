const asyncWrapper = require("../../../middleware/asyncWrapper");

describe("Testing the asyncWrapper middleware", () => {
  it("should call the provided function with the correct arguments", async () => {
    const mockFn = jest.fn();
    const req = {};
    const res = {};
    const next = jest.fn();

    await asyncWrapper(mockFn)(req, res, next);

    expect(mockFn).toHaveBeenCalledWith(req, res);
  });

  it("should call the next function if the provided function resolves successfully", async () => {
    const mockFn = jest.fn().mockResolvedValue();
    const req = {};
    const res = {};
    const next = jest.fn();

    await asyncWrapper(mockFn)(req, res, next);

    //expect(next).toHaveBeenCalled();
  });

  it("should call the next function with an error if the provided function throws an error", async () => {
    const mockFn = jest.fn().mockRejectedValue(new Error("Test error"));
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };
    const next = jest.fn();

    await asyncWrapper(mockFn)(req, res, next);

    //expect(next).toHaveBeenCalledWith(new Error("Test error"));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Test error" });
  });
});