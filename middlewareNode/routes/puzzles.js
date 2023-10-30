const express = require('express')
const router = express.Router()
const puzzles = require('../models/puzzles')

// Get all puzzles
router.get('/list', async (req, res) => {
  try {
      const puzzlesArray = await puzzles.find({}, {_id: 0 });
      res.status(200).json(puzzlesArray);
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

module.exports = router
