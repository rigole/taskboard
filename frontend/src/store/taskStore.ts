import type { TaskResponse, TaskRequest } from "../types/task";
import { taskService } from "../services/taskService";
import { create } from "zustand";
import axios from "axios";
import type { User } from "../types/auth";

interface taskState {
  loading: boolean;
  task: TaskResponse | null;
  users: User[] | [];
  addTask: (data: TaskRequest) => Promise<void>;
  getUsersForTask: () => Promise<void>;
  updateTask: (id: string, data: TaskRequest) => Promise<TaskRequest>;
  getTask: (id: string) => Promise<TaskRequest>;
  error: string | null;
}

export const useTaskState = create<taskState>((set) => ({
  task: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  users: [],
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
  getTask: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.getTask(id);
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
  getUsersForTask: async () => {
    set({ loading: true, error: null });
    try {
      const response = await taskService.getUsersForTask();
      set({ loading: false, error: null, users: response });
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
