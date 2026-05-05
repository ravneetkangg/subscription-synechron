const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');
const subscriptionRoutes = require('./src/routes/subscriptionRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Using a sample MongoDB Atlas URI
const MONGO_URI = 'mongodb+srv://ravneetkang2003:Qub96c6xBOb9nkak@cluster0.tdraycq.mongodb.net/grocery-subscriptions';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Subscription Service connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/products', productRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'subscription-service' });
});

app.listen(PORT, () => {
  console.log(`Subscription Service running on port ${PORT}`);
});
