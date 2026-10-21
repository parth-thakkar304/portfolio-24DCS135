import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// ==========================================
// Practical 8: Route-Based Code Splitting with React.lazy()
// ==========================================
const Projects = lazy(() => import('./components/Projects'));
const TaskManager = lazy(() => import('./components/TaskManager'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const location = useLocation();

  const skills = [
    "React",
    "JavaScript (ES6+)",
    "HTML5 & CSS3",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Python",
    "Git & GitHub",
  ];

  // State Variable: Dark Mode Toggle
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved !== null) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app-container">
      {/* Navigation bar stays 100% stationary at top with smooth sliding indicator */}
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Route-driven main content body with keyed page transitions and Suspense code-splitting */}
      <main className="main-content container">
        <div key={location.pathname} className="page-transition">
          <Suspense fallback={<LoadingSpinner message="Optimizing bundle... loading page chunk" />}>
            <Routes location={location}>
              <Route 
                path="/" 
                element={
                  <Home 
                    name="Parth Thakkar" 
                    subtitle="Full-Stack Developer & Tech Student" 
                    themeColor={darkMode ? "#c084fc" : "#6366f1"} 
                    skills={skills} 
                  />
                } 
              />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<TaskManager />} />
              <Route path="/contact" element={<Contact />} />
              {/* Fallback 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

export default App;