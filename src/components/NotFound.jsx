import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="notfound-container page-transition">
      <div className="notfound-code">404</div>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-desc">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="home-btn">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
