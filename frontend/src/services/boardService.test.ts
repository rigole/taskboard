import { boardService } from "./boardService";
import api from "./api";
import { vi } from "vitest";
vi.mock("./api");

const mockedApi = api as ReturnType<typeof vi.mocked<typeof api>>;

const mockBoards = [
  {
    id: "aojvasdjojnvanrvinffno",
    name: "mockBoard Name 2",
    description: "mockBoard Description 2",
    created: new Date(),
    updatedAt: new Date(),
    columns: [],
  },
  {
    id: "aojvasdjojnvanrvio",
    name: "mockBoard Name",
    description: "mockBoard Description",
    created: new Date(),
    updatedAt: new Date(),
    columns: [],
  },
];
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe("getUsersBoards", () => {
  it("calls the correct endpoint", async () => {
    localStorage.setItem("token", "mock-token");
    mockedApi.get.mockResolvedValueOnce({ data: mockBoards });

    await boardService.getUserBoards();
    expect(mockedApi.get).toHaveBeenCalledWith("/boards");
  });

  it("throws when the user is not authenticated", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("401 Unauthorized"));
    await expect(boardService.getUserBoards()).rejects.toThrow(
      "401 Unauthorized",
    );
  });
  it("throws when the API call fails", async () => {
    localStorage.setItem("token", "mock-token");
    mockedApi.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(boardService.getUserBoards()).rejects.toThrow("Network error");
  });
});
