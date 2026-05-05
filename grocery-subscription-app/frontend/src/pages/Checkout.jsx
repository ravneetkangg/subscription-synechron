import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { subscriptionApi, paymentApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, frequency } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!product) return <div className="page-wrapper container"><h1>No product selected</h1></div>;
  if (!user) return null;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Process Payment
      await paymentApi.post('/charge', {
        userId: user._id,
        amount: product.price,
        paymentMethod: 'credit_card'
      });
      
      // 2. Create Subscription
      await subscriptionApi.post('/subscriptions', {
        userId: user._id,
        productId: product._id,
        frequency
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/subscriptions'), 2000);
      
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Checkout failed. Make sure all backend services are running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper container">
      <div style={{ maxWidth: '500px', margin: '0 auto' }} className="card">
        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h2 style={{ color: '#4ade80' }}>Payment Successful!</h2>
            <p>Your subscription is confirmed. Redirecting...</p>
          </div>
        ) : (
          <>
            <h2>Checkout</h2>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3>{product.name}</h3>
              <p className="card-desc">{frequency} delivery</p>
              <div className="card-price">${product.price.toFixed(2)}</div>
            </div>
            
            <form onSubmit={handlePayment}>
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-input" placeholder="0000 0000 0000 0000" required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Expiry</label>
                  <input type="text" className="form-input" placeholder="MM/YY" required />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">CVC</label>
                  <input type="text" className="form-input" placeholder="123" required />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Processing...' : `Pay $${product.price.toFixed(2)} & Subscribe`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
