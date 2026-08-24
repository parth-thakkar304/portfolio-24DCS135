# Student Portfolio Application (`portfolio-24DCS135`)

A modern, responsive, full-stack application developed for the **Advanced Web Development Frameworks** course. Built with **React 19**, **Vite**, **React Router v7**, **Node.js**, **Express**, **Mongoose**, and **MongoDB**.

---

## 🚀 Practicals Overview

### 📍 Practical 1: Introduction to React & Component Architecture
* **Component-Based UI:** Built reusable functional components (`Header`, `About`, `Skills`, `Footer`).
* **Data Flow via Props:** Implemented unidirectional data flow passing data (name, subtitle, skill list) down from `App.jsx` to child components.
* **Vite Scaffolding:** Configured local development environment using Vite build tools.

### 📍 Practical 2: State Management & Routing in React
* **Client-Side Routing:** Integrated `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `NavLink`) for seamless multi-page navigation across `/`, `/projects`, `/contact`, and wildcard fallback `*`.
* **State Management (`useState`):** Managed global theme state (Dark/Light mode toggle persisted in `localStorage`) and form states.
* **Controlled Form Inputs:** Implemented real-time form inputs with live character count and live message preview mirror.
* **Fallback 404 Route:** Custom `NotFound` error component for unmapped paths with home navigation link.

### 📍 Practical 3: API Integration & Data Rendering in React
* **GitHub REST API Integration:** Asynchronous data fetching (`fetch` + `useEffect`) from GitHub's public API (`https://api.github.com/users/{username}/repos`).
* **Loading State:** CSS animated loading spinner (`.spinner`) while asynchronous network requests are pending.
* **Error Handling & Retry Button:** Defensive error handling displaying a styled error alert with a **"Retry Request"** button.
* **Real-Time Filter/Search:** Live search input allowing users to filter repositories dynamically by name or language.
* **Repo Metadata:** Displays repository name, description, star count, language, forks, and direct GitHub links.

### 📍 Practical 4: Building a RESTful API with Node.js and Express
* **Express RESTful API:** Implemented full CRUD endpoints (`GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`).
* **5-Stage Middleware Pipeline:** CORS middleware, `express.json()` body parser, global request logger middleware (`[TIMESTAMP] METHOD URL`), Content-Type JSON validator, and route task ID validator.
* **Centralized Error & 404 Handling:** Catch-all route handler for unmapped endpoints and a global error handling middleware `(err, req, res, next)` placed last in the pipeline.
* **Interactive Frontend Dashboard:** Visual dashboard UI to test CRUD routes, status codes, 404, 500 error handler, and live API response payload inspector.

### 📍 Practical 5: MongoDB Integration and Schema Design with Mongoose
* **Persistent Database Integration:** Connected Node/Express server to MongoDB using Mongoose ODM (`mongoose.connect()`), replacing temporary in-memory arrays.
* **Mongoose Schema & Validation:** Created Task Schema (`models/Task.js`) with required field checks, auto-trimming, default values, priority enum restriction (`['low', 'medium', 'high']`), and a pre-save title trim hook.
* **Environment Configuration (`dotenv`):** Managed database credentials securely using `.env` (gitignored) and provided `.env.example` for public repository reference.
* **Structured Error Response Mapping:** Centralized error handler returning formatted JSON error payloads for Mongoose `ValidationError` (HTTP 400) and `CastError` (HTTP 404).

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Library:** React 19, Vite, `react-router-dom` v7
* **Backend Framework:** Node.js, Express.js
* **Database & ODM:** MongoDB, Mongoose ODM
* **Environment Management:** `dotenv`, `cors`
* **Styling:** Vanilla CSS (Dark luxury theme with shimmer skeleton loading)

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parth-thakkar304/portfolio-24DCS135.git
   cd portfolio-24DCS135
   ```

2. **Start Frontend (React):**
   ```bash
   npm install
   npm run dev
   ```

3. **Start Backend Server (Express + MongoDB):**
   ```bash
   cd task-manager-api/backend
   npm install
   node server.js
   ```

4. Open `http://localhost:5173` for Frontend and `http://localhost:5000` for REST API Backend.
