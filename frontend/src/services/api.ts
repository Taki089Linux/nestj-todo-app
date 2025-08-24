import axios from 'axios';
import { Todo, CreateTodoData, UpdateTodoData } from '@/types/todo';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Get single todo by ID
  getById: async (id: string): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  create: async (data: CreateTodoData): Promise<Todo> => {
    const response = await api.post('/todos', data);
    return response.data;
  },

  // Update todo
  update: async (id: string, data: UpdateTodoData): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, data);
    return response.data;
  },

  // Delete todo
  delete: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },

  // Toggle todo completion status
  toggleComplete: async (id: string, isCompleted: string): Promise<Todo> => {
    const response = await api.put(`/todos/${id}`, { isCompleted });
    return response.data;
  },
};
