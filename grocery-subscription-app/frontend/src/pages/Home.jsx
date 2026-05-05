import { useEffect, useState } from 'react';
import { subscriptionApi } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await subscriptionApi.get('/products');
        // If DB is empty, maybe we should show a message or call seed API, but we'll assume it's seeded.
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="page-wrapper container">
      <h1>Fresh Groceries Delivered</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Subscribe to daily or weekly deliveries of your essential groceries.</p>
      
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
          {products.length === 0 && <p>No products found. Please seed the database.</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
