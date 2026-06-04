import api from "./api";
import type { BoardRequest, BoardResponse } from "../types/board";

const getUserBoards = async (): Promise<BoardResponse[]> => {
  const response = await api.get("/boards");
  return response.data;
};

const addBoard = async (data: BoardRequest): Promise<BoardResponse> => {
  const response = await api.post("/boards", data);
  return response.data;
};

const updateBoard = async (
  id: string,
  data: BoardRequest,
): Promise<BoardResponse> => {
  const response = await api.put(`/boards/${id}`, data);
  return response.data;
};

const deleteBoard = async (id: string): Promise<void> => {
  await api.delete(`/boards/${id}`);
};

export const boardService = {
  getUserBoards,
  addBoard,
  deleteBoard,
  updateBoard,
};
