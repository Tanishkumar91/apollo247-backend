const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// ✅ Add a new doctor
router.post('/add-doctor', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: 'Doctor added successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ List doctors with optional filters and pagination
router.get('/list-doctor-with-filter', async (req, res) => {
  try {
    let { experience, fees, page = 1, limit = 6 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (experience) filter.experience = { $lte: Number(experience) };
    if (fees) filter.fees = { $lte: Number(fees) };

    const total = await Doctor.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const doctors = await Doctor.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      doctors,
      total,
      page,
      totalPages
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
