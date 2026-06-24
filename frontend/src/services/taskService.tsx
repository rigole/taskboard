import api from "./api";
import type { TaskResponse, TaskRequest } from "../types/task";
import type { User } from "../types/auth";

const createTask = async (data: TaskRequest): Promise<TaskResponse> => {
  const response = await api.post("/tasks", data);
  return response.data;
};

const updateTask = async (
  taskId: string,
  data: Partial<TaskRequest>,
): Promise<TaskResponse> => {
  const response = await api.put(`/tasks/${taskId}`, data);
  return response.data;
};

const getTask = async (taskId: string): Promise<TaskResponse> => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

const getUsersForTask = async (): Promise<User[]> => {
  const response = await api.get("/tasks/users");
  return response.data;
};

export const taskService = {
  createTask,
  updateTask,
  getTask,
  getUsersForTask,
};
