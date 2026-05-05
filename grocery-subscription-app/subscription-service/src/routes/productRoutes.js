const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed mock products (Admin utility)
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const products = [
      { name: 'Fresh Milk', description: '1 Liter Organic Milk', price: 2.50, imageUrl: 'https://via.placeholder.com/150/ffffff/000000?text=Milk' },
      { name: 'Farm Eggs', description: 'Dozen Free-range Eggs', price: 3.00, imageUrl: 'https://via.placeholder.com/150/ffffff/000000?text=Eggs' },
      { name: 'Whole Wheat Bread', description: 'Freshly baked daily', price: 2.00, imageUrl: 'https://via.placeholder.com/150/ffffff/000000?text=Bread' }
    ];
    await Product.insertMany(products);
    res.status(201).json({ message: 'Database seeded with mock products!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
