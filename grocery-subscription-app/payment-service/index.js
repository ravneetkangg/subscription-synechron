const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./src/routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 5003;

// Using a sample MongoDB Atlas URI
const MONGO_URI = '';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Payment Service connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/payments', paymentRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'payment-service' });
});

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});
