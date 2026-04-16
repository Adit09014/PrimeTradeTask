# 🚀 TaskFlow - Full Stack Task Management App

## 📌 Overview

TaskFlow is a full-stack task management application that allows users to:

* Register and login securely (JWT + cookies)
* Create, update, delete, and view tasks
* Manage tasks with a clean dashboard UI
* Support role-based users (User/Admin)

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React (Vite)
* Zustand (State Management)
* CSS (Dark Theme UI)

### 🔹 Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication (Cookies)

---

## 🔐 Features

### 👤 Authentication

* User Signup & Login
* JWT stored in HTTP-only cookies
* Auto login using cookie-based auth
* Logout functionality

### 📋 Task Management

* Create Task
* Get All Tasks
* Update Task
* Delete Task
* User-specific tasks (protected routes)

### 🧠 State Management

* Zustand used for:

  * Auth state
  * Task state

---

## 📂 Project Structure

```
/Frontend
  ├── src/
  │   ├── store/
  │   │   ├── useAuthStore.js
  │   │   └── useTaskStore.js
  │   ├── App.jsx
  │   └── App.css

/Backend
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  └── server.js
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Adit09014/PrimeTradeTask
cd PrimeTradeTask
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## 🔗 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /api/auth/signup  |
| POST   | /api/auth/login   |
| POST   | /api/auth/logout  |
| GET    | /api/auth/profile |

---

### 📋 Task Routes

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/tasks     |
| POST   | /api/tasks     |
| PUT    | /api/tasks/:id |
| DELETE | /api/tasks/:id |

---

## 🔒 Authentication Flow

1. User logs in / signs up
2. JWT token stored in HTTP-only cookie
3. Middleware verifies token
4. User data attached to `req.user`
5. Protected routes accessed securely

---

## ⚠️ Common Issues & Fixes

### ❌ "Unauthorized"

* Check `credentials: "include"` in frontend
* Check CORS config in backend

### ❌ Tasks not showing

* Ensure backend returns:

```json
{ "tasks": [...] }
```

### ❌ Signup error (All fields required)

* Use `fullName` instead of `name`

---

## 🚀 Future Improvements

* Role-based dashboards (Admin/User)
* Task filtering & search
* Pagination
* UI enhancements
* Notifications

---

## 👨‍💻 Author

Adit Shreshtha

---

