const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Mock Payment processing
router.post('/charge', async (req, res) => {
  try {
    const { userId, amount, paymentMethod } = req.body;
    
    // We mock the payment gateway response. Assume it's always successful.
    const transaction = new Transaction({
      userId,
      amount,
      paymentMethod,
      status: 'successful'
    });
    
    await transaction.save();
    
    res.status(200).json({ 
      message: 'Payment processed successfully', 
      transaction 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user payment history
router.get('/history/:userId', async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
