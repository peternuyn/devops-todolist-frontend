import axios from 'axios';
import { Todo, CreateTodoInput, UpdateTodoInput } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos with optional filters
  getAllTodos: async (filters?: { completed?: boolean; priority?: string; search?: string }): Promise<Todo[]> => {
    const params = new URLSearchParams();
    if (filters?.completed !== undefined) {
      params.append('completed', filters.completed.toString());
    }
    if (filters?.priority) {
      params.append('priority', filters.priority);
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    
    const { data } = await api.get<Todo[]>(`/todos?${params.toString()}`);
    return data;
  },

  // Get single todo by ID
  getTodoById: async (id: number): Promise<Todo> => {
    const { data } = await api.get<Todo>(`/todos/${id}`);
    return data;
  },

  // Create new todo
  createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
    const { data } = await api.post<Todo>('/todos', todo);
    return data;
  },

  // Update todo
  updateTodo: async (id: number, updates: UpdateTodoInput): Promise<Todo> => {
    const { data } = await api.put<Todo>(`/todos/${id}`, updates);
    return data;
  },

  // Toggle todo completion
  toggleTodo: async (id: number): Promise<Todo> => {
    const { data } = await api.patch<Todo>(`/todos/${id}/toggle`);
    return data;
  },

  // Delete todo
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
};
