import MockAdapter from "axios-mock-adapter";
import TokenService from "../services/token/tokenService";
import axiosInstance from "./RequestAndResponseInterceptor";

jest.mock("../services/token/tokenService");

describe("RequestAndResponseInterceptor", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axiosInstance);
    TokenService.mockClear();
  });

  it("should add Authorization header when token exists", async () => {
    TokenService.prototype.getToken.mockReturnValue("test-token");
    mock.onGet("/test").reply((config) => {
      expect(config.headers["Authorization"]).toBe("Bearer test-token");
      return [200, {}];
    });

    await axiosInstance.get("/test");
  });

  it("should not add Authorization header when token does not exist", async () => {
    TokenService.prototype.getToken.mockReturnValue(null);
    mock.onGet("/test").reply((config) => {
      expect(config.headers["Authorization"]).toBeUndefined();
      return [200, {}];
    });

    await axiosInstance.get("/test");
  });
});
