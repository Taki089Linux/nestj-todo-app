import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoData, UpdateTodoData } from '@/types/todo';
import { todoApi } from '@/services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new todo
  const createTodo = useCallback(async (todoData: CreateTodoData) => {
    try {
      setError(null);
      const newTodo = await todoApi.create(todoData);
      setTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      throw err;
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (id: string, updateData: UpdateTodoData) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.update(id, updateData);
      setTodos(prev => prev.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    }
  }, []);

  // Delete todo
  const deleteTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      await todoApi.delete(id);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    }
  }, []);

  // Toggle todo completion
  const toggleTodoComplete = useCallback(async (id: string) => {
    try {
      setError(null);
      const todo = todos.find(t => t._id === id);
      if (!todo) return;

      const newStatus = todo.isCompleted === 'true' ? 'false' : 'true';
      const updatedTodo = await todoApi.toggleComplete(id, newStatus);
      setTodos(prev => prev.map(t => 
        t._id === id ? updatedTodo : t
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
      throw err;
    }
  }, [todos]);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodoComplete,
    refetch: fetchTodos,
  };
};
