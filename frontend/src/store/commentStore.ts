import { create } from "zustand";
import axios from "axios";
import { commentService } from "../services/commentService";
import type { CommentRequest, CommentResponse } from "../types/comment";

interface commentState {
  loading: boolean;
  error: string | null;
  comments: CommentResponse[] | [];
  addComment: (data: CommentRequest) => Promise<CommentResponse>;
  updateComment: (id: string, data: CommentRequest) => Promise<CommentResponse>;
  getTaskComments: (taskId: string) => Promise<void>;
}

export const useCommentState = create<commentState>((set) => ({
  loading: false,
  error: null,
  comments: [],
  addComment: async (data: CommentRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await commentService.addComment(data);
      set((state) => ({
        loading: false,
        error: null,
        comments: [...state.comments, response],
      }));
      return response;
    } catch (error) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  getTaskComments: async (taskId: string) => {
    set({ loading: true, error: null });
    try {
      const comments = await commentService.getTaskComments(taskId);
      set({ comments, loading: false });
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  updateComment: async (id: string, data: CommentRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await commentService.updateComment(id, data);
      set((state) => ({
        loading: false,
        error: null,
        comments: state.comments.map((c) => (c.id === id ? response : c)),
      }));
      return response;
    } catch (error) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
}));
