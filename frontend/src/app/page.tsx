'use client';

import { useState } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, Edit3, X } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import { CreateTodoData, UpdateTodoData } from '@/types/todo';

export default function Home() {
  const { todos, loading, error, createTodo, updateTodo, deleteTodo, toggleTodoComplete } = useTodos();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<CreateTodoData>({ title: '', description: '' });
  const [editForm, setEditForm] = useState<UpdateTodoData>({ title: '', description: '' });

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    
    try {
      await createTodo(newTodo);
      setNewTodo({ title: '', description: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create todo:', error);
    }
  };

  const handleUpdateTodo = async (id: string) => {
    if (!editForm.title?.trim()) return;
    
    try {
      await updateTodo(id, editForm);
      setEditingTodo(null);
      setEditForm({ title: '', description: '' });
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteTodo(id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  const startEditing = (todo: any) => {
    setEditingTodo(todo._id);
    setEditForm({ title: todo.title, description: todo.description || '' });
  };

  const cancelEditing = () => {
    setEditingTodo(null);
    setEditForm({ title: '', description: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </div>

        {/* Create Todo Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Todo
          </button>
        </div>

        {/* Create Todo Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Todo</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateTodo} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter todo title"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter todo description (optional)"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create Todo
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Todos List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <CheckCircle2 className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No todos yet. Create your first todo to get started!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                {editingTodo === todo._id ? (
                  // Edit Form
                  <div className="space-y-4">
                    <div>
                      <label htmlFor={`edit-title-${todo._id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        id={`edit-title-${todo._id}`}
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor={`edit-description-${todo._id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id={`edit-description-${todo._id}`}
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={cancelEditing}
                        className="px-3 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateTodo(todo._id)}
                        className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  // Todo Display
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleTodoComplete(todo._id)}
                      className="mt-1 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {todo.isCompleted === 'true' ? (
                        <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-medium ${
                        todo.isCompleted === 'true' ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`mt-2 text-gray-600 ${
                          todo.isCompleted === 'true' ? 'line-through' : ''
                        }`}>
                          {todo.description}
                        </p>
                      )}
                      <p className="text-sm text-gray-400 mt-2">
                        Created: {new Date(todo.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(todo)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-200"
                        title="Edit todo"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                        title="Delete todo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
