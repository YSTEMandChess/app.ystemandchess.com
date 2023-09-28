const express = require('express')
const router = express.Router()
const puzzles = require('../models/puzzles')

// Get all puzzles
router.get('/list', async (req, res) => {
  try {
    const puzzlesArray = await puzzles.find({}, {_id: 0}).lean();
    res.status(200).json(puzzlesArray)
    console.log('All puzzles loaded')
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

// get opening puzzles
router.get('/opening', async (req, res) => {
  try {
    const puzzlesArray = await puzzles.find({"Themes": {"$regex": "opening"}}, {_id: 0}).lean();
    res.status(200).json(puzzlesArray);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

// get middlegame puzzles
router.get('/middlegame', async (req, res) => {
  try {
    const puzzlesArray = await puzzles.find({"Themes": {"$regex": "middlegame"}}, {_id: 0}).lean();
    res.status(200).json(puzzlesArray);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

// get endgame puzzles
router.get('/endgame', async (req, res) => {
  try {
    const puzzlesArray = await puzzles.find({"Themes": {"$regex": "endgame"}}, {_id: 0}).lean();
    res.status(200).json(puzzlesArray);
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

module.exports = router
