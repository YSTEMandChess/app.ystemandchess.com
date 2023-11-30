const express = require('express')
const router = express.Router()
const leaderboard = require('../models/leaderBoard')

router.get('/top10', async (req, res) => {
    try {
      // retrieve all documents, sorted from highest to lowest, and limit the result to first 10
      const data = await leaderboard.find({}, {_id: 0}).sort({"score": -1}).limit(10);
      res.status(200).json(data);
    } catch (error) {
      console.error(error.message)
      res.status(500).json('Server error')
    }
});

// returns a "slice" of the leaderboard from the database, each slice contains 10 entries
// usage: route should be /leaderboard/slice/?id=x
// where x is a number representing which "slice" to take, starting with 0 
// i.e. id=0 means first slice (first 10), id=1 means second slice (second 10), etc.
router.get('/slice', async (req, res) => {
  try {
    // we want to skip id * 10 records in our result
    skip = req.query.id * 10;
    // retrieve all documents, sorted from highest to lowest, skip by skip number, then limit result to firts 10
    const data = await leaderboard.find({}, {_id: 0}).sort({"score": -1}).skip(skip).limit(10);
    res.status(200).json(data);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
  
});

module.exports = router
