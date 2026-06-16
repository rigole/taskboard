import authService from "./authService";
import api from "./api";
import { vi } from "vitest";
vi.mock("./api");

const mockedApi = api as ReturnType<typeof vi.mocked<typeof api>>;

const mockAuthResponse = {
  token: "mock-jwt-token",
  fullName: "test",
  image: "",
  email: "test@example.com",
  role: "USER",
};

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});
describe("authService.register", () => {
  it("calls the correct endpoint with the provided data", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: mockAuthResponse });

    await authService.register({
      email: "test@example.com",
      password: "password123",
      fullName: "test",
    });

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith("/auth/register", {
      email: "test@example.com",
      password: "password123",
      fullName: "test",
    });
  });

  it("returns the auth response data on success", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: mockAuthResponse });

    const result = await authService.register({
      email: "test@example.com",
      password: "password123",
      fullName: "test",
    });

    expect(result).toEqual(mockAuthResponse);
  });

  it("throws when the API call fails", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Network error"));

    await expect(
      authService.register({
        email: "test@example.com",
        password: "password123",
        fullName: "test",
      }),
    ).rejects.toThrow("Network error");
  });
});

describe("authService.login", () => {
  it("calls the correct endpoint with the provided data", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: mockAuthResponse });

    await authService.login({
      email: "test@example.com",
      password: "password123",
    });

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "password123",
    });
  });

  it("returns the auth response data on success", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: mockAuthResponse });

    const result = await authService.login({
      email: "test@example.com",
      password: "password123",
    });

    expect(result).toEqual(mockAuthResponse);
  });

  it("throws when the API call fails", async () => {
    mockedApi.post.mockRejectedValueOnce(new Error("Invalid credentials"));

    await expect(
      authService.login({
        email: "test@example.com",
        password: "wrongpassword",
      }),
    ).rejects.toThrow("Invalid credentials");
  });
});

describe("authService.logout", () => {
  it("removes the token from localStorage", () => {
    localStorage.setItem("token", "some-token");

    authService.logout();

    expect(localStorage.getItem("token")).toBeNull();
  });

  it("does not throw when no token exists in localStorage", () => {
    expect(() => authService.logout()).not.toThrow();
  });

  it("does not remove unrelated localStorage keys", () => {
    localStorage.setItem("token", "some-token");
    localStorage.setItem("user_preference", "dark_mode");

    authService.logout();

    expect(localStorage.getItem("user_preference")).toBe("dark_mode");
  });
});
