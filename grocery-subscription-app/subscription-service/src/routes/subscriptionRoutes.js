const express = require('express');
const Subscription = require('../models/Subscription');
const router = express.Router();

// Get user subscriptions
router.get('/:userId', async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId }).populate('productId');
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create subscription
router.post('/', async (req, res) => {
  try {
    const { userId, productId, frequency } = req.body;
    const subscription = new Subscription({ userId, productId, frequency });
    await subscription.save();
    res.status(201).json({ message: 'Subscription created', subscription });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel subscription
router.put('/:id/cancel', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    res.json({ message: 'Subscription cancelled', subscription });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
