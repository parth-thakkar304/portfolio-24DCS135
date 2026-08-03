# Student Portfolio Application (`portfolio-24DCS135`)

A modern, responsive, single-page student portfolio application developed for the **Advanced Web Development Frameworks** course. Built with **React 19**, **Vite**, and **React Router v7**.

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

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Library:** React 19
* **Build Tool:** Vite
* **Routing:** `react-router-dom` v7
* **API:** GitHub REST API (`https://api.github.com`)
* **Styling:** Vanilla CSS (Glassmorphism design system with Light/Dark mode)

---

## 💻 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/parth-thakkar304/portfolio-24DCS135.git
   cd portfolio-24DCS135
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.
