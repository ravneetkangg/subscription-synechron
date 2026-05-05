import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">FreshBox</Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Groceries</Link>
          <Link to="/subscriptions" className={`nav-link ${location.pathname === '/subscriptions' ? 'active' : ''}`}>My Subscriptions</Link>
          <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>Admin Portal</Link>
          
          {user ? (
            <>
              <span className="nav-link" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn" style={{ padding: '0.25rem 0.75rem', fontSize: '0.9rem', marginLeft: '0.5rem' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>Login</Link>
              <Link to="/signup" className={`nav-link ${location.pathname === '/signup' ? 'active' : ''}`}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
