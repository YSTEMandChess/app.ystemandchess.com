const express = require('express')
const router = express.Router()
const leaderboard = require('../models/leaderBoard')

router.get('/top10', async (req, res) => {
    try {
      console.log("GET REQUEST: top10");
      // retrieve all documents, sorted from highest to lowest, and limit the result to first 10
      const data = await leaderboard.find({}, {_id: 0});
      res.status(200).json(data);
    } catch (error) {
      console.error(error.message)
      res.status(500).json('Server error')
    }
  });

module.exports = router
