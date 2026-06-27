export interface TaskRequest {
  title: string;
  description?: string;
  column: string;
  position: number;
  priority?: string;
  dueDate: Date | string;
  createdBy: string;
  assignee?: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  column: string;
  position: number;
  priority?: string;
  dueDate: Date;
  assignee?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  position: number;
  priority?: string;
  dueDate?: Date;
  assignee?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MoveTaskRequest {
  targetColumnId: string;
  position?: number;
}
 