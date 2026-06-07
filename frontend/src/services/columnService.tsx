import api from "./api";
import type { ColumnRequest, ColumnResponse } from "../types/column";

const getBoardColumns = async (
  boardId: string,
): Promise<ColumnResponse[]> => {
  const response = await api.get(`/columns/${boardId}`, );
  return response.data;
};

const addColumn = async (
  data: ColumnRequest,
): Promise<ColumnResponse> => {
  const response = await api.post(`/columns`, data);
  return response.data;
}

const updateColumn = async (
  columnId: string,
  data: Partial<ColumnRequest>
): Promise<ColumnResponse> => {
  const response = await api.put(`/columns/${columnId}`, data);
  return response.data;
};

const deleteColumn = async (
  columnId: string
): Promise<void> => {
  await api.delete(`/columns/${columnId}`);
};

export const columnService = {
  getBoardColumns,
  addColumn,
  updateColumn,
  deleteColumn
};
