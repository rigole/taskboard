import api from "./api";
import type { CommentRequest, CommentResponse } from "../types/comment";

const addComment = async (data: CommentRequest): Promise<CommentResponse> => {
  const response = await api.post("/comments", data);
  return response.data;
};

const getTaskComments = async (taskId: string): Promise<CommentResponse[]> => {
  const response = await api.get(`/comments/${taskId}`);
  return response.data;
};

const updateComment = async (
  id: string,
  data: CommentRequest,
): Promise<CommentResponse> => {
  const response = await api.put(`/comments/${id}`, data);
  return response.data;
};

export const commentService = {
  addComment,
  getTaskComments,
  updateComment,
};
