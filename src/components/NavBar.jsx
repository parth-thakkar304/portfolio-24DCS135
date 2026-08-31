import { NavLink, useLocation } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

function NavBar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef(null);

  useEffect(() => {
    if (!navLinksRef.current) return;
    
    // Find currently active link element
    const activeLink = navLinksRef.current.querySelector('.nav-link.active');
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setSliderStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
        opacity: 1
      });
    } else {
      setSliderStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <NavLink to="/" className="nav-logo">
          PT
        </NavLink>

        <div className="nav-links-container">
          <ul className="nav-links" ref={navLinksRef}>
            {/* Animated Sliding Active Pill Box */}
            <div className="nav-sliding-pill" style={sliderStyle} />

            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/tasks" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Dark/Light Mode Theme Toggle */}
        <button 
          type="button"
          onClick={toggleDarkMode} 
          className="theme-toggle"
          title="Toggle Dark/Light Mode"
          aria-label="Toggle theme"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </nav>
    </div>
  );
}

export default NavBar;
