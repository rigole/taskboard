import api from "./api";
import type { TaskResponse, TaskRequest } from "../types/task";

const createTask = async (data: TaskRequest): Promise<TaskResponse> => {
    const response = await api.post('/tasks', data);
    return response.data;
}

const updateTask = async (taskId: string, data: Partial<TaskRequest>): Promise<TaskResponse> => {
    const response = await api.put(`/tasks/${taskId}`, data);
    return response.data;

}


export const taskService = {
    createTask,
    updateTask
}