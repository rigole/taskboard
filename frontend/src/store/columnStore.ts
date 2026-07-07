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
  getBoardColumns: (boardId: string) => Promise<ColumnResponse[]>;
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
      const response = await columnService.getBoardColumns(boardId);         
      set({ columns: response, loading: false });
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
        col.tasks.some((task) => String(task.id) === String(taskId)),
      );
      const targetColumn = state.columns.find(
        (col) => String(col.id) === String(moveTaskData.targetColumnId),
      );
      if (!sourceColumn || !targetColumn) {
        console.error(
          "Could not find source or target column layout in state.",
        );
        return state;
      }
      const taskToMove = sourceColumn.tasks.find(
        (t) => String(t.id) === String(taskId),
      );

      if (!taskToMove) {
        console.error(
          `Task with ID ${taskId} not found in column ${sourceColumn.id}`,
        );
        return state;
      }

      const targetPosition = moveTaskData.position ?? targetColumn.tasks.length;

      const updatedColumns = state.columns.map((col) => {
        const isSource = String(col.id) === String(sourceColumn.id);
        const isTarget = String(col.id) === String(targetColumn.id);
        if (isSource && isTarget) {
          const tasksWithoutMoved = col.tasks.filter(
            (t) => String(t.id) !== String(taskId),
          );
          const newTasks = [...tasksWithoutMoved];
          newTasks.splice(targetPosition, 0, taskToMove);
          return { ...col, tasks: newTasks };
        }
        if (isSource) {
          return {
            ...col,
            tasks: col.tasks.filter((t) => String(t.id) !== String(taskId)),
          };
        }
        if (isTarget) {
          const tasksWithoutMoved = col.tasks.filter(
            (t) => String(t.id) !== String(taskId),
          );
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
