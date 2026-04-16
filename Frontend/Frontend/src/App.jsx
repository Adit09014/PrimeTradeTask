import React, { useEffect, useState } from "react";
import { useAuthStore } from "./store/useAuthStore";
import {useTaskStore} from "./store/useTaskStore"
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const { authUser, checkAuth, login, signup, logout, isCheckingAuth } =
    useAuthStore();

  const [activeTab, setActiveTab] = useState("login");
  

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    fullName: "", 
    email: "",
    password: "",
    role: "user"
  });

  const { tasks, fetchTasks, createTask, updateTask, deleteTask } = useTaskStore();
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser) fetchTasks();
  }, [authUser]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    createTask(taskForm);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginForm);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    signup(registerForm);
  };

  

  const handleUpdateTask = (e) => {
    e.preventDefault();
    updateTask(editingTask.id, taskForm);
  };


  if (isCheckingAuth) return <div>Loading...</div>;

  // 🔐 AUTH SCREEN
  if (!authUser) {
    return (
      <div className="auth-container">
        <div className="auth-card">

          <div className="brand">
            <h1>TaskFlow</h1>
            <p>Manage your tasks efficiently</p>
          </div>

          <div className="tab-buttons">
            <button
              className={activeTab === "login" ? "active" : ""}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={activeTab === "register" ? "active" : ""}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {activeTab === "login" ? (
            <form onSubmit={handleLogin} className="auth-form">

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                />
              </div>

              <button className="btn-primary">Login</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">

              <div className="form-group">
                <label>Name</label>
                <input
                  value={registerForm.fullName}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, fullName: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({ ...registerForm, password: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
              <label>Role</label>
              <select
                value={registerForm.role}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

              <button className="btn-primary">Register</button>
            </form>
          )}

        </div>
      </div>
    );
  }

  // 🧠 DASHBOARD
  return (
    <div className="dashboard">

      <div className="navbar">
        <h2>Welcome {authUser.name}</h2>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-grid">

        {/* FORM */}
        <div className="task-form-section">
          <h3>{editingTask ? "Edit Task" : "Create Task"}</h3>

          <form
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            className="auth-form"
          >
            <div className="form-group">
              <input
                placeholder="Title"
                value={taskForm.title}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <input
                placeholder="Description"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, description: e.target.value })
                }
              />
            </div>

            <button className="btn-primary">
              {editingTask ? "Update" : "Create"}
            </button>
          </form>
        </div>

        {/* TASK LIST */}
        <div className="tasks-list-section">
          <h3>Tasks ({tasks.length})</h3>

          <div className="tasks-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-card">

                <div className="task-header">
                  <h4>{task.title}</h4>
                  <span className={`status-badge status-${task.status}`}>
                    {task.status}
                  </span>
                </div>

                <p className="task-description">{task.description}</p>

                <div className="task-actions">
                  <button
                    className="btn-edit"
                    onClick={() => setEditingTask(task)}
                  >
                    Edit
                  </button>

                  <button onClick={() => deleteTask(task.id)} className="btn-delete">Delete</button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;