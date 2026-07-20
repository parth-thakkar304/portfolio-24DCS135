import { NavLink } from 'react-router-dom';

function NavBar({ darkMode, toggleDarkMode }) {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar glass-panel">
        <NavLink to="/" className="nav-logo">
         PT
        </NavLink>
        
        <ul className="nav-links">
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
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Dark/Light Mode Theme Toggle */}
        <button 
          type="button"
          onClick={toggleDarkMode} 
          className="theme-toggle"
          title="Toggle Dark/Light Mode"
          aria-label="Toggle theme"
        >
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </nav>
    </div>
  );
}

export default NavBar;
