import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userApi } from '../services/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await userApi.post('/register', { name, email, password });
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh' }}>
      <div className="card" style={{ display: 'flex', flexDirection: 'row-reverse', maxWidth: '900px', width: '100%', padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Left Side Branding (on right in flex row-reverse) */}
        <div style={{ flex: 1, background: 'var(--accent-gradient)', padding: '4rem 3rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(30px)' }}></div>
          
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', zIndex: 1 }}>Join Us Today!</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, zIndex: 1 }}>
            Create an account to start getting fresh groceries delivered directly to your door on your schedule.
          </p>
        </div>

        {/* Right Side Form (on left in flex row-reverse) */}
        <div style={{ flex: 1.2, padding: '3rem 3rem', background: 'white' }}>
          <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1.8rem' }}>Create Account</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Fill in your details to get started</p>
          
          {error && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Full Name</label>
              <input 
                type="text" 
                className="form-input" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="John Doe"
                style={{ background: '#f8fafc' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="john@example.com"
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
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem' }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: '600', textDecoration: 'none' }}>Log in</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
