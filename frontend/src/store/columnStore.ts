import { create } from "zustand";
import type { ColumnResponse, ColumnRequest } from "../types/column.ts";
import { columnService } from "../services/columnService.tsx";
import axios from "axios";
import type { MoveTaskRequest } from "../types/task.ts";

interface ColumnState {
  columns: ColumnResponse[] | [];
  loading: boolean;
  error: string | null;
  setColumns: (columns: ColumnResponse[]) => void;
  getBoardColumns: (boardId: string) => Promise<void>;
  createColumn: (data: ColumnRequest) => Promise<void>;
  updateColumn: (
    columnId: string,
    data: Partial<ColumnRequest>,
  ) => Promise<void>;
  moveTask: (taskId: string, moveTask: MoveTaskRequest) => Promise<void>;
  deleteColumn: (columnId: string) => Promise<void>;
}

export const useColumnState = create<ColumnState>((set) => ({
  columns: [],
  loading: false,
  error: null,
  setColumns: (columns: ColumnResponse[]) => set({ columns }),
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
      set((state) => ({
        columns: [...state.columns, newColumn],
        loading: false,
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
  updateColumn: async (columnId: string, data: Partial<ColumnRequest>) => {
    set({ loading: true, error: null });
    try {
      console.log("Updated column:", data);
      console.log("Column ID:", columnId);
      /*
      const updatedColumn = await columnService.updateColumn(columnId, data);

      set((state) => ({
        columns: state.columns.map((col) =>
          col.id === columnId ? updatedColumn : col,
        ),
        loading: false,
      }));
      */
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
      set((state) => ({
        columns: state.columns.filter((col) => col.id !== columnId),
        loading: false,
      }));
    } catch (error) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  moveTask: async (taskId: string, moveTaskData: MoveTaskRequest) => {
  set({ loading: true, error: null });
  let snapshot: ColumnResponse[] = [];

  set((state) => {
    snapshot = state.columns;

    const sourceColumn = state.columns.find((col) =>
      col.tasks.some((task) => task.id === taskId)
    );
    const targetColumn = state.columns.find(
      (col) => col.id === moveTaskData.targetColumnId
    );

    if (!sourceColumn || !targetColumn) return state;

    const taskToMove = sourceColumn.tasks.find((t) => t.id === taskId)!;
    const targetPosition = moveTaskData.position ?? targetColumn.tasks.length;

    const updatedColumns = state.columns.map((col) => {
      if (col.id === sourceColumn.id && col.id === targetColumn.id) {
        const tasksWithoutMoved = col.tasks.filter((t) => t.id !== taskId);
        const newTasks = [...tasksWithoutMoved];
        newTasks.splice(targetPosition, 0, taskToMove);
        return { ...col, tasks: newTasks };
      }

      if (col.id === sourceColumn.id) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskId),
        };
      }
      if (col.id === targetColumn.id) {
        const tasksWithoutMoved = col.tasks.filter((t) => t.id !== taskId);
        const newTasks = [...tasksWithoutMoved];
        newTasks.splice(targetPosition, 0, taskToMove);
        return { ...col, tasks: newTasks };
      }

      return col;
    });

    return { columns: updatedColumns };
  });

  try {
    await columnService.moveTask(taskId, moveTaskData);
    set({ loading: false, error: null });
  } catch (error: unknown) {
    set({ columns: snapshot, loading: false });
    let serverMessage = "Invalid data or server error";
    if (axios.isAxiosError(error)) {
      serverMessage = error.response?.data?.message ?? serverMessage;
    }
    set({ error: serverMessage });
    throw error;
  }
},
}));
