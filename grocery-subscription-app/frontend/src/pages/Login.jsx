import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await userApi.post('/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'row', maxWidth: '900px', width: '100%', padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Left Side Branding */}
        <div style={{ flex: 1, background: 'var(--accent-gradient)', padding: '4rem 3rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(30px)' }}></div>
          
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', zIndex: 1 }}>Welcome Back!</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, zIndex: 1 }}>
            Sign in to continue accessing your fresh grocery subscriptions and manage your daily deliveries.
          </p>
        </div>

        {/* Right Side Form */}
        <div style={{ flex: 1, padding: '4rem 3rem', background: 'white' }}>
          <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1.8rem' }}>Log In</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Enter your credentials to access your account</p>
          
          {error && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Email or Username</label>
              <input 
                type="text" 
                className="form-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="root"
                style={{ background: '#f8fafc' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Password</label>
              <input 
                type="password" 
                className="form-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
                style={{ background: '#f8fafc' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '2rem', padding: '1rem' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'none' }}>Sign up</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
