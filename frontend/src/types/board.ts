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
}
