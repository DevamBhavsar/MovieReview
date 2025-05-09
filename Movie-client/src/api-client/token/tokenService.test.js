import jwtDecode from "jwt-decode";
import TokenService from "./tokenService";

jest.mock("jwt-decode");

describe("TokenService", () => {
  let tokenService;

  beforeEach(() => {
    tokenService = new TokenService();
    localStorage.clear();
  });

  it("should set and get token", () => {
    const token = "test-token";
    tokenService.setToken(token);
    expect(tokenService.getToken()).toBe(token);
  });

  it("should validate token", () => {
    const token = "valid-token";
    tokenService.setToken(token);
    jwtDecode.mockReturnValue({ exp: Date.now() / 1000 + 3600 });
    expect(tokenService.isTokenValid()).toBe(true);
  });

  it("should invalidate expired token", () => {
    const token = "expired-token";
    tokenService.setToken(token);
    jwtDecode.mockReturnValue({ exp: Date.now() / 1000 - 3600 });
    expect(tokenService.isTokenValid()).toBe(false);
  });

  it("should get user roles", () => {
    const token = "token-with-roles";
    tokenService.setToken(token);
    jwtDecode.mockReturnValue({ authorities: ["USER", "ADMIN"] });
    expect(tokenService.getUserRoles()).toEqual(["USER", "ADMIN"]);
  });

  it("should clear token", () => {
    tokenService.setToken("test-token");
    tokenService.clearToken();
    expect(tokenService.getToken()).toBeNull();
  });
});
