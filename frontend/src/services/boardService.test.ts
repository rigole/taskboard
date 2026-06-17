import { boardService } from "./boardService";
import api from "./api"
import { vi } from "vitest";
vi.mock("./api");

const mockedApi = api as ReturnType<typeof vi.mocked<typeof api>>;

const mockBoardResponse = {
    id: "aojvasdjojnvanrvio",
    name:"mockBoard Name",
    description:"mockBoard Description",
    created: new Date(),
    updatedAt: new Date(),
    columns: []
}
