import { useEffect, useState } from 'react';
import { subscriptionApi } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('none');

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

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });

  return (
    <div className="page-wrapper container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Fresh Groceries Delivered</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Subscribe to daily or weekly deliveries of your essential groceries.</p>
        </div>
        
        {!loading && products.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <label style={{ fontWeight: '500', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sort by Cost:</label>
            <select 
              className="form-input" 
              style={{ width: 'auto', padding: '0.5rem 1rem', background: 'white' }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        )}
      </div>
      
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid" style={{ marginTop: '0' }}>
          {sortedProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
          {products.length === 0 && <p>No products found. Please seed the database.</p>}
        </div>
      )}
    </div>
  );
};

export default Home;
