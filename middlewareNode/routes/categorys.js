const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const { check, validationResult } = require('express-validator')
const categorys = require('../models/categorys')

// @route   GET /user/children
// @desc    GET the parent user's children username and their timePlayed fields
// @access  Public with jwt Authentication
router.get('/list', async (req, res) => {
  try {
      //Find all category for the parent user and retrieve only the name and CatId field
      const categoryArray = await categorys
        .find({});
      res.status(200).json(categoryArray);
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

module.exports = router
