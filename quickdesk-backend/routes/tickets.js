const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// ✅ Create new ticket
router.post('/', async (req, res) => {
  try {
    const { title, description, category, status, createdBy } = req.body;

    // Validation (optional but good for debugging)
    if (!title || !description || !category || !createdBy || !status) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const ticket = new Ticket({
      title,
      description,
      category,
      status,
      createdBy
    });

    await ticket.save();
    res.status(201).json({ success: true, ticket });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Get all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update ticket status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
