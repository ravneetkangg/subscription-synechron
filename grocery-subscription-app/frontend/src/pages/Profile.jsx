import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { userApi } from '../services/api';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await userApi.put(`/${user._id}/profile`, { profilePicture });
      updateUser(res.data);
      setMessage({ text: 'Profile picture updated successfully!', type: 'success' });
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Failed to update profile picture.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2>User Profile</h2>
        
        <div style={{ margin: '2rem 0' }}>
          <img 
            src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
            alt="Profile" 
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              marginBottom: '1rem'
            }} 
          />
          <h3>{user.name}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
          <div style={{ marginTop: '0.5rem' }}>
            <span className={`status-badge ${user.role === 'admin' ? 'status-active' : 'status-cancelled'}`}>
              Role: {user.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleUpdate} style={{ textAlign: 'left', marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
          <h3>Update Profile Picture</h3>
          {message.text && (
            <div style={{ 
              color: message.type === 'success' ? '#16a34a' : '#dc2626',
              marginBottom: '1rem',
              fontWeight: '500'
            }}>
              {message.text}
            </div>
          )}
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">Profile Image URL</label>
            <input 
              type="text" 
              className="form-input" 
              value={profilePicture} 
              onChange={(e) => setProfilePicture(e.target.value)} 
              placeholder="https://example.com/your-image.jpg"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Save Profile Picture'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
