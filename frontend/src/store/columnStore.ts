import { create } from 'zustand';
import type { ColumnResponse, ColumnRequest } from '../types/column.ts';
import { columnService } from '../services/columnService.tsx';
import axios from 'axios';

interface ColumnState {
  columns: ColumnResponse[] | [];
  loading: boolean;
  error: string | null;
  getBoardColumns: (boardId: string) => Promise<void>;
  createColumn: (data: ColumnRequest) => Promise<void>;
  updateColumn: (columnId: string, data: Partial<ColumnRequest>) => Promise<void>;
  deleteColumn: (columnId: string) => Promise<void>;
}

export const useColumnState = create<ColumnState>((set) => ({
  columns: [],
  loading: false,
  error: null,
  getBoardColumns: async (boardId: string) => {
    set({ loading: true, error: null });
    try {
      const columns = await columnService.getBoardColumns(boardId);
      set({ columns, loading: false });
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  
  createColumn: async (data: ColumnRequest) => {
    set({ loading: true, error: null });
    try {
      const newColumn = await columnService.addColumn(data);
      set((state) => ({ columns: [...state.columns, newColumn], loading: false }));
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  updateColumn: async (columnId: string, data: Partial<ColumnRequest>) => {
    set({ loading: true, error: null });
    try {
      const updatedColumn = await columnService.updateColumn(columnId, data);
      set((state) => ({
        columns: state.columns.map((col) => (col.id === columnId ? updatedColumn : col)),
        loading: false
      }));
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  deleteColumn: async (columnId: string) => {
    set({ loading: true, error: null });
    try {
      await columnService.deleteColumn(columnId);
      set((state) => ({ columns: state.columns.filter((col) => col.id !== columnId), loading: false }));
    } catch (error) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  }
}));