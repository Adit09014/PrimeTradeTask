import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useTaskStore = create((set, get) => ({
  tasks: [],
  isLoading: false,

  // 📥 GET TASKS
  fetchTasks: async () => {
    try {
      set({ isLoading: true });

      const res = await fetch(`${API_BASE_URL}/task`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        set({ tasks: data.tasks });
      }
    } catch (err) {
      console.error("Fetch tasks error:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  // ➕ CREATE TASK
  createTask: async (taskData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(taskData),
      });

      if (res.ok) {
        // 🔥 refresh list
        get().fetchTasks();
      }
    } catch (err) {
      console.error("Create task error:", err);
    }
  },

  // ✏️ UPDATE TASK
  updateTask: async (id, taskData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(taskData),
      });

      if (res.ok) {
        get().fetchTasks();
      }
    } catch (err) {
      console.error("Update task error:", err);
    }
  },

  // ❌ DELETE TASK
  deleteTask: async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/task/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        get().fetchTasks();
      }
    } catch (err) {
      console.error("Delete task error:", err);
    }
  },
}));