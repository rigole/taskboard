export interface Comment {
  id: string;
  content: string;
  author: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskRequest {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string;
  targetColumnId: string;
  assigneeId: string;
}