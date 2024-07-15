const express = require('express');
const jwt = require('jsonwebtoken');
const Resume = require('../models/Resume');

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    next();
  });
};

router.get('/', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.userId });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { sections } = req.body;
  try {
    const resume = new Resume({ user: req.userId, sections });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
