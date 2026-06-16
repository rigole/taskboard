import type { TaskResponse, TaskRequest } from "../types/task";
import { taskService } from "../services/taskService";
import { create } from "zustand";
import axios from "axios";

interface taskState {
  loading: boolean;
  task: TaskResponse | null;
  addTask: (data: TaskRequest) => Promise<void>;
  updateTask: (id: string, data: TaskRequest) => Promise<void>;
  error: string | null;
}

export const useTaskState = create<taskState>((set) => ({
  task: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  addTask: async (data: TaskRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.createTask(data);
      set({ loading: false, error: null, task: response });
    } catch (error: unknown) {
      let serverMessage = "Invalid data or server error";
      if (axios.isAxiosError(error)) {
        serverMessage = error.response?.data?.message ?? serverMessage;
      }
      set({ loading: false, error: serverMessage });
      throw error;
    }
  },
  updateTask: async (id: string, data: TaskRequest) => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.updateTask(id, data);
      set({ loading: false, error: null, task: response });
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
