const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Using a sample MongoDB Atlas URI (Dummy/Public sample format)
const MONGO_URI = 'mongodb+srv://ravneetkang2003:Qub96c6xBOb9nkak@cluster0.tdraycq.mongodb.net/grocery-users';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('User Profile Service connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'user-profile-service' });
});

app.listen(PORT, () => {
  console.log(`User Profile Service running on port ${PORT}`);
});
