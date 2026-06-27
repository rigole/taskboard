export interface CommentResponse {
  id: string;
  content: string;
  author: string;
  taskId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CommentRequest {
  content: string;
  updatedAt?: Date;
  taskId: string;
}