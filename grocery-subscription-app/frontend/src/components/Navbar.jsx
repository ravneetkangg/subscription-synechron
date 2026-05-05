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
        <Link to="/" className="navbar-brand">Subscription Box Service</Link>
        <div className="nav-links">
          {(!user || user.role !== 'admin') && (
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Groceries</Link>
          )}
          {user && user.role !== 'admin' && (
            <Link to="/subscriptions" className={`nav-link ${location.pathname === '/subscriptions' ? 'active' : ''}`}>My Subscriptions</Link>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>Admin Portal</Link>
          )}
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', padding: '0.25rem', borderRadius: '50px', transition: 'background 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                <img 
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                  alt="Profile" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid white', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                />
                <span style={{ fontWeight: '600', color: 'var(--text-primary)', paddingRight: '0.5rem' }}>{user.name}</span>
              </Link>
              <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }}></div>
              <button onClick={handleLogout} className="btn" style={{ padding: '0.5rem 1.25rem', fontSize: '0.95rem', borderRadius: '10px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid #e2e8f0', boxShadow: 'none' }} onMouseOver={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.borderColor = '#fecaca'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>Logout</button>
            </div>
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
