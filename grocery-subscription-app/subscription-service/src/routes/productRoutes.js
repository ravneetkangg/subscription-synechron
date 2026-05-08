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

// Add new product (Admin utility)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const product = new Product({ name, description, price, imageUrl });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
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

// Update product (Admin utility)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, imageUrl },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
