import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState('weekly');
  const { user } = useContext(AuthContext);

  const handleSubscribe = () => {
    navigate('/checkout', { state: { product, frequency } });
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <div className="card">
      <img src={product.imageUrl || `https://source.unsplash.com/random/400x300/?${product.name.split(' ')[0]}`} alt={product.name} className="card-img" />
      <h3 className="card-title">{product.name}</h3>
      <p className="card-desc">{product.description}</p>
      <div className="card-price">${product.price.toFixed(2)}</div>
      
      {!isAdmin && (
        <>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <select 
              className="form-input" 
              value={frequency} 
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="weekly">Weekly Delivery</option>
              <option value="daily">Daily Delivery</option>
            </select>
          </div>
          
          <button className="btn btn-primary" onClick={handleSubscribe}>
            Subscribe Now
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCard;
