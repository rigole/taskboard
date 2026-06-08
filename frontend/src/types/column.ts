import type { Task } from "./task";

export interface ColumnRequest {
  name: string;
  boardId: string;
  position: number;
  tasks?: Task[];
}

export interface ColumnResponse {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Columns {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ColumnModalProps {
  open: boolean;
  onClose: () => void;
}
