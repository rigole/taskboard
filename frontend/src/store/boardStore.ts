import type { BoardRequest, BoardResponse } from "../types/board.ts";
import { create } from "zustand";
import { boardService } from "../services/boardService.tsx";
import axios from "axios";

interface BoardState {
  boards: BoardResponse[] | [];
  board: BoardResponse | null;
  getUserBoards: () => Promise<void>;
  addBoard: (data: BoardRequest) => Promise<void>;
  getBoardById: (id: string) => Promise<BoardResponse>;
  updateBoard: (id: string, data: BoardRequest) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  error: string | null;
  loading: boolean;
}

export const useBoardState = create<BoardState>((set) => ({
  boards: [],
  board: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  getUserBoards: async () => {
    set({ loading: true, error: null });
    try {
      const response = await boardService.getUserBoards();
      set({ boards: response, loading: false, error: null });
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  addBoard: async (data: BoardRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await boardService.addBoard(data);
      set({ loading: false, error: null, board: response, boards: [] });
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  getBoardById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await boardService.getBoardById(id);
      set({ loading: false, error: null, board: response });
      return response;
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  updateBoard: async (id: string, data: BoardRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await boardService.updateBoard(id, data);
      set({ loading: false, error: null, board: response });
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  deleteBoard: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await boardService.deleteBoard(id);
      set({ loading: false, error: null, boards: [] });
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
}));
