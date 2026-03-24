import React, { createContext, useContext, useState, useCallback } from 'react';
import API from '../api/axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await API.get(`/tasks?${params}`);
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    const { data } = await API.post('/tasks', taskData);
    setTasks((prev) => [data, ...prev]);
    return data;
  };

  const updateTask = async (id, taskData) => {
    const { data } = await API.put(`/tasks/${id}`, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    return data;
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleComplete = async (id, completed) => {
    return updateTask(id, { completed });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask, toggleComplete }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);