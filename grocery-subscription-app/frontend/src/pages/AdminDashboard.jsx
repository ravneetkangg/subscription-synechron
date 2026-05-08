import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userApi, subscriptionApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [editingProductId, setEditingProductId] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    fetchUsers();
    fetchSubscriptions();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await userApi.get('/all');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const res = await subscriptionApi.get('/subscriptions/all');
      setSubscriptions(res.data);
    } catch (err) {
      console.error('Error fetching subscriptions', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await subscriptionApi.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await userApi.delete(`/${userId}`);
        setUsers(users.filter(u => u._id !== userId));
      } catch (err) {
        console.error('Error deleting user', err);
        alert('Failed to delete user.');
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || ''
    });
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setNewProduct({ name: '', description: '', price: '', imageUrl: '' });
    setMessage('');
  };

  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await subscriptionApi.put(`/products/${editingProductId}`, newProduct);
        setMessage('Product updated successfully!');
      } else {
        await subscriptionApi.post('/products', newProduct);
        setMessage('Product added successfully!');
      }
      fetchProducts();
      cancelEdit();
    } catch (err) {
      setMessage('Error saving product.');
      console.error(err);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`tab-btn ${activeTab === 'subscriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscriptions')}
          >
            Subscriptions
          </button>
          <button
            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => { setActiveTab('products'); cancelEdit(); }}
          >
            Manage Groceries
          </button>
        </div>

        {activeTab === 'users' && (
          <div>
            <h2>All Users</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Joined Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>...{u._id.slice(-6)}</td>
                      <td>
                        <img 
                          src={u.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random`} 
                          alt="avatar" 
                          className="table-avatar"
                        />
                        <span style={{ fontWeight: '600' }}>{u.name}</span>
                        {u.role === 'admin' && <span className="status-badge status-active" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>ADMIN</span>}
                      </td>
                      <td>{u.email}</td>
                      <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                      <td>
                        {u.role !== 'admin' && (
                          <button className="btn btn-danger" onClick={() => handleDeleteUser(u._id)}>Delete</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div>
            <h2>All Subscriptions</h2>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Subscription ID</th>
                    <th>User ID</th>
                    <th>Product</th>
                    <th>Frequency</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map(sub => (
                    <tr key={sub._id}>
                      <td>{sub._id}</td>
                      <td>{sub.userId}</td>
                      <td>{sub.productId ? sub.productId.name : 'Unknown'}</td>
                      <td>{sub.frequency}</td>
                      <td>
                        <span className={`status-badge status-${sub.status}`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2>Manage Groceries</h2>
              {editingProductId && (
                <button className="btn btn-warning" onClick={cancelEdit}>Cancel Edit</button>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              
              <div className="admin-table-container" style={{ flex: 1.5 }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td>
                          <div style={{ fontWeight: '600' }}>{p.name}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{p.description}</div>
                        </td>
                        <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>${p.price.toFixed(2)}</td>
                        <td>
                          <button className="btn btn-warning" onClick={() => handleEditProduct(p)}>Edit</button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr><td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No products found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="admin-form-container" style={{ flex: 1, margin: 0 }}>
                <h3 style={{ marginBottom: '1.5rem' }}>{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
                {message && <p style={{ color: message.includes('Error') ? '#dc2626' : '#16a34a', marginBottom: '1rem', fontWeight: '500' }}>{message}</p>}
                
                <form onSubmit={handleSaveProduct}>
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleProductChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={newProduct.description}
                      onChange={handleProductChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={newProduct.price}
                      onChange={handleProductChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={newProduct.imageUrl}
                      onChange={handleProductChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    {editingProductId ? 'Update Product' : 'Add Product'}
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
