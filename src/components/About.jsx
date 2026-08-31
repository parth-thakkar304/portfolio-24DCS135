import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="about-card glass-panel">
      <div className="about-details">
        <h2>About Me</h2>
        <p>
          I am a passionate IT engineering student specializing in Advanced Web Development Frameworks. 
          I love building scalable, modern, and visually stunning web applications with rich user experiences.
        </p>
        <p>
          My focus is on mastering React 19, Express REST APIs, MongoDB Mongoose ODM, modern styling standards, and full-stack architecture.
        </p>

        <div className="about-cta-buttons" style={{ display: 'flex', gap: '12px', marginTop: '18px', flexWrap: 'wrap' }}>
          <Link to="/projects" className="btn btn-primary">
            Explore GitHub Projects →
          </Link>
          <Link to="/tasks" className="btn btn-secondary">
            Manage Full-Stack Tasks
          </Link>
        </div>
      </div>
    </section>
  );
}

export default About;