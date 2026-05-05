import { useEffect, useState } from 'react';
import { subscriptionApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const fetchSubscriptions = async () => {
    if (!user) return;
    try {
      const res = await subscriptionApi.get(`/subscriptions/${user._id}`);
      setSubscriptions(res.data);
    } catch (error) {
      console.error('Failed to fetch subscriptions', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const cancelSubscription = async (id) => {
    try {
      await subscriptionApi.put(`/subscriptions/${id}/cancel`);
      fetchSubscriptions(); // Refresh list
    } catch (error) {
      console.error('Failed to cancel', error);
    }
  };

  return (
    <div className="page-wrapper container">
      <h1>My Subscriptions</h1>
      
      {!user ? (
        <p>Please log in to see your subscriptions.</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {subscriptions.length === 0 ? (
            <p>You have no active subscriptions.</p>
          ) : (
            subscriptions.map(sub => (
              <div key={sub._id} className="card">
                <h3 className="card-title">{sub.productId?.name || 'Unknown Product'}</h3>
                <p className="card-desc">Frequency: {sub.frequency}</p>
                <p className="card-desc">Status: <strong style={{ color: sub.status === 'active' ? '#4ade80' : '#f87171'}}>{sub.status}</strong></p>
                
                {sub.status === 'active' && (
                  <button 
                    className="btn" 
                    style={{ background: 'transparent', border: '1px solid #f87171', color: '#f87171', marginTop: '1rem' }}
                    onClick={() => cancelSubscription(sub._id)}
                  >
                    Cancel Subscription
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
