const express = require('express');
const Tender = require('../Models/Tender');
const router = express.Router();

// Fetch all tenders
router.get('/', async (req, res) => {
  try {
    const tenders = await Tender.findAll();
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tenders' });
  }
});

// Add a new tender
router.post('/', async (req, res) => {
  const { title, description, expiryDate } = req.body;
  try {
    const newTender = await Tender.create({ title, description, expiryDate });
    res.status(201).json(newTender);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create tender' });
  }
});

// Delete a tender
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tender = await Tender.findByPk(id);
    if (tender) {
      await tender.destroy();
      res.json({ message: 'Tender deleted successfully' });
    } else {
      res.status(404).json({ error: 'Tender not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete tender' });
  }
});

module.exports = router;
