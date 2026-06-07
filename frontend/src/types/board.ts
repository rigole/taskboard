import type { ColumnResponse } from "./column";

export interface BoardRequest {
  name: string;
  description?: string;
  updateDate?: Date;
}

export interface BoardResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  columns: ColumnResponse[];
}

export interface BoardModalProps {
  open: boolean;
  onClose: () => void;
  board: BoardResponse | null;
}
