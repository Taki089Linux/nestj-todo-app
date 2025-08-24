export interface Todo {
  _id: string;
  title: string;
  description?: string;
  isCompleted: string;
  createdAt: Date;
}

export interface CreateTodoData {
  title: string;
  description?: string;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  isCompleted?: string;
}
