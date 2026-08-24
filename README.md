<div align="center">

# 🚀 Advanced Web Development Frameworks
### Full-Stack MERN Portfolio & Task Manager API

![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-v22.18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v4.21-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-v8.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-v8.10-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-v6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

</div>

---

## 📌 Course Metadata

* **Course Name:** Advanced Web Development Frameworks
* **Student Name:** Parth Thakkar
* **Student ID:** `24DCS135`
* **Repository Name:** `portfolio-24DCS135`
* **Repository Link:** [https://github.com/parth-thakkar304/portfolio-24DCS135](https://github.com/parth-thakkar304/portfolio-24DCS135)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Repository Structure](#-repository-structure)
- [Practicals Breakdown](#-practicals-breakdown)
  - [Practical 1: Introduction to React & Component Architecture](#-practical-1-introduction-to-react--component-architecture)
  - [Practical 2: State Management & Routing in React](#-practical-2-state-management--routing-in-react)
  - [Practical 3: API Integration & Data Rendering in React](#-practical-3-api-integration--data-rendering-in-react)
  - [Practical 4: RESTful API with Node.js, Express & Middleware](#-practical-4-restful-api-with-nodejs-express--middleware)
  - [Practical 5: MongoDB Integration & Schema Validation with Mongoose](#-practical-5-mongodb-integration--schema-validation-with-mongoose)
- [API Endpoint Documentation](#-api-endpoint-documentation)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)

---

## 📖 Overview

This repository contains the complete coursework and lab implementations for the **Advanced Web Development Frameworks** course. It showcases a modern, responsive Single Page Application (SPA) frontend built with **React 19**, **Vite**, and **React Router v7**, alongside a robust **Node.js/Express** RESTful backend API powered by **MongoDB** and **Mongoose ODM**.

---

## 📂 Repository Structure

```text
portfolio-24DCS135/
├── public/                     # Static public web assets
├── src/                        # React Frontend Source Code
│   ├── assets/                 # SVGs and static image assets
│   ├── components/             # Reusable Functional Components
│   │   ├── About.jsx           # About Me section component
│   │   ├── Contact.jsx         # Controlled form with live preview & counter
│   │   ├── Footer.jsx          # Social links and copyright footer
│   │   ├── Header.jsx          # Dynamic header with theme props
│   │   ├── Home.jsx            # Portfolio hero home page
│   │   ├── NotFound.jsx        # Catch-all 404 error page component
│   │   ├── Projects.jsx        # GitHub API fetch & live search filter
│   │   └── Skills.jsx          # Skill badges rendering component
│   ├── App.jsx                 # Root layout & route configuration
│   ├── index.css               # Design system & dark luxury CSS styles
│   └── main.jsx                # Application entry point with BrowserRouter
├── task-manager-api/           # Express & MongoDB REST API Backend
│   ├── backend/                # Server source code
│   │   ├── models/             # Mongoose Schemas & Data Models
│   │   │   └── Task.js         # Validated Task schema with priority enum
│   │   ├── .env.example        # Environment variables template
│   │   ├── .gitignore          # Excludes node_modules & secret .env
│   │   ├── package.json        # Express & Mongoose dependencies
│   │   └── server.js           # REST API routes & middleware pipeline
│   └── frontend/               # Interactive API Inspector Dashboard
│       ├── app.js              # Real-time Fetch API dashboard logic
│       ├── index.html          # Clean dashboard markup
│       └── style.css           # Dark minimalist UI design system
├── index.html                  # React Vite root HTML file
├── package.json                # React frontend dependencies
├── README.md                   # Full course & repository documentation
└── vite.config.js              # Vite bundler configuration
```

---

## 🛠️ Practicals Breakdown

### 📍 Practical 1: Introduction to React & Component Architecture
* **Component-Based UI:** Built reusable functional components (`Header`, `About`, `Skills`, `Footer`).
* **Data Flow via Props:** Implemented unidirectional data flow passing data (name, subtitle, skill list) down from `App.jsx` to child components.
* **Vite Scaffolding:** Configured local development environment using Vite build tools.

---

### 📍 Practical 2: State Management & Routing in React
* **Client-Side Routing:** Integrated `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `NavLink`) for seamless multi-page navigation across `/`, `/projects`, `/contact`, and wildcard fallback `*`.
* **State Management (`useState`):** Managed global theme state (Dark/Light mode toggle persisted in `localStorage`) and form states.
* **Controlled Form Inputs:** Implemented real-time form inputs with live character count and live message preview mirror.
* **Fallback 404 Route:** Custom `NotFound` error component for unmapped paths with home navigation link.

---

### 📍 Practical 3: API Integration & Data Rendering in React
* **GitHub REST API Integration:** Asynchronous data fetching (`fetch` + `useEffect`) from GitHub's public API (`https://api.github.com/users/{username}/repos`).
* **Loading State:** CSS animated loading spinner (`.spinner`) while asynchronous network requests are pending.
* **Error Handling & Retry Button:** Defensive error handling displaying a styled error alert with a **"Retry Request"** button.
* **Real-Time Filter/Search:** Live search input allowing users to filter repositories dynamically by name or language.
* **Repo Metadata:** Displays repository name, description, star count, language, forks, and direct GitHub links.

---

### 📍 Practical 4: RESTful API with Node.js, Express & Middleware
* **Express RESTful API:** Implemented full CRUD endpoints (`GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`).
* **5-Stage Middleware Pipeline:**
  1. `cors()`: Cross-Origin Resource Sharing middleware.
  2. `express.json()`: Request body JSON parser.
  3. **Global Request Logger:** Logs `[TIMESTAMP] METHOD URL` for every incoming request.
  4. **Content-Type Validator:** Rejects `POST`/`PUT` requests missing `application/json` with HTTP 400.
  5. **Task ID Validator:** Validates route parameter `:id` is a valid positive integer.
* **Centralized Error & 404 Handling:** Catch-all route handler for unmapped endpoints and a global error handling middleware `(err, req, res, next)` placed last in the pipeline.
* **Interactive Frontend Dashboard:** Visual dashboard UI to test CRUD routes, status codes, 404, 500 error handler, and live API response payload inspector.

---

### 📍 Practical 5: MongoDB Integration & Schema Validation with Mongoose
* **Persistent Database Integration:** Connected Node/Express server to MongoDB using Mongoose ODM (`mongoose.connect()`), replacing temporary in-memory arrays.
* **Mongoose Schema & Validation (`models/Task.js`):**
  * `title`: String, required, automatically trimmed of whitespace.
  * `description`: String.
  * `completed`: Boolean, default `false`.
  * `priority`: String enum restricted to `['low', 'medium', 'high']` (default: `'medium'`).
  * `createdAt`: Date, default `Date.now`.
  * **Pre-save Hook:** Automatically trims whitespace from `title` before saving to MongoDB.
* **Environment Configuration (`dotenv`):** Managed database connection string securely using `.env` (gitignored) and provided `.env.example` for public repository reference.
* **Structured Error Response Mapping:** Centralized error handler returning formatted JSON error payloads for Mongoose `ValidationError` (HTTP 400) and `CastError` (HTTP 404).

---

## 📡 API Endpoint Documentation

| Method | Endpoint | Description | Expected HTTP Status |
| :---: | :--- | :--- | :---: |
| `GET` | `/tasks` | Retrieve all task documents from MongoDB | `200 OK` |
| `GET` | `/tasks/:id` | Retrieve a single task by MongoDB `_id` | `200 OK` / `404 Not Found` |
| `POST` | `/tasks` | Create a new task document with schema validation | `201 Created` / `400 Bad Request` |
| `PUT` | `/tasks/:id` | Update an existing task document by `_id` | `200 OK` / `404 Not Found` |
| `DELETE` | `/tasks/:id` | Delete a task document from MongoDB by `_id` | `200 OK` / `404 Not Found` |
| `GET` | `/error-test` | Trigger global 500 error handler for testing | `500 Internal Error` |

---

## 💻 Tech Stack

* **Frontend:** React 19, Vite, React Router v7, Vanilla CSS
* **Backend:** Node.js, Express.js
* **Database & ODM:** MongoDB, Mongoose ODM
* **Tooling & Environment:** `dotenv`, `cors`, `nodemon`, Git & GitHub

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18.0.0 or higher)
* npm (v9.0.0 or higher)
* MongoDB (Local instance or MongoDB Atlas connection URI)

### 1. Clone the Repository
```bash
git clone https://github.com/parth-thakkar304/portfolio-24DCS135.git
cd portfolio-24DCS135
```

### 2. Run React Frontend Application
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Run Express + MongoDB Backend API
```bash
cd task-manager-api/backend
npm install
node server.js
```
The REST API backend will run on `http://localhost:5000`.

---

<div align="center">

</div>
