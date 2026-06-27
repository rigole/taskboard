import { create } from "zustand";
import axios from "axios";
import { commentService } from "../services/commentService";
import type { CommentRequest, CommentResponse } from "../types/comment";

interface commentState {
  loading: boolean;
  error: string | null;
  addComment: (data: CommentRequest) => Promise<CommentResponse>;
  //updateComment: (id: string, data: CommentRequest) => Promise<CommentResponse>;
}

export const useCommentState = create<commentState>((set) => ({
  loading: false,
  error: null,
  addComment: async (data: CommentRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await commentService.addComment(data);
      set({ loading: false, error: null });
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
  //updateComment: async () => {},
}));
