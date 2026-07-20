import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

function App() {
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
      {/* Navigation bar with active route highlighting & theme toggle */}
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Route-driven main content body */}
      <main className="main-content container">
        <Routes>
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
          <Route path="/contact" element={<Contact />} />
          {/* Fallback 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

export default App;