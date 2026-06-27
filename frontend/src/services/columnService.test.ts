import { columnService } from "./columnService";
import api from "./api";
import { vi } from "vitest";
vi.mock("./api");

const mockedApi = api as ReturnType<typeof vi.mocked<typeof api>>;

const mockedColumns = [
  {
    id: "asgfggffgef",
    name: "mocked Column 1",
    position: 1,
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "asgfggffgefasgaaggfva",
    name: "2",
    position: 2,
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const mockedColumnsRequest = {
  name: "mock Column request",
  boardId: "vwavxvdrwcre",
  position: 1,
  tasks: [],
  updatedAt: new Date(),
};

const mockColumnResponse = {
  id: "asgfggffgefasgaaggfva",
  name: "2",
  position: 1,
  tasks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe("get columns Board", () => {
  const boardId = mockedColumnsRequest.boardId;
  it("call the correct endpoint", async () => {
    localStorage.setItem("token", "mock-token");
    mockedApi.get.mockResolvedValueOnce({ data: mockedColumns });
    await columnService.getBoardColumns(boardId);

    expect(mockedApi.get).toHaveBeenCalledWith(`/columns/${boardId}`);
  });

  it("throws error when the user is not authenticated", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("401 Unauthorized"));
    await expect(columnService.getBoardColumns(boardId)).rejects.toThrow(
      "401 Unauthorized",
    );
  });
  it("throws when the API call fails", async () => {
    localStorage.setItem("token", "mock-token");
    mockedApi.get.mockRejectedValueOnce(new Error("Network error"));

    await expect(columnService.getBoardColumns(boardId)).rejects.toThrow(
      "Network error",
    );
  });
});

describe("create Column", () => {
  it("calls the correct endpoint with the provided data", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: mockColumnResponse });
    await columnService.addColumn({
      name: "mock Column request",
      boardId: "vwavxvdrwcre",
      position: 1,
      tasks: [],
      updatedAt: new Date(),
    });

    expect(mockedApi.post).toHaveBeenCalledTimes(1);
    expect(mockedApi.post).toHaveBeenCalledWith(`/columns`, {
      name: "mock Column request",
      boardId: "vwavxvdrwcre",
      position: 1,
      tasks: [],
      updatedAt: new Date(),
    });
  });

  it("returns the create column response data on success", async () => {
    mockedApi.post.mockResolvedValueOnce({ data: mockColumnResponse });

    const result = await columnService.addColumn(mockedColumnsRequest);
    expect(result).toEqual(mockColumnResponse);
  });
});
