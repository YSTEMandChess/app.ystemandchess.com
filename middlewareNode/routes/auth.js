const express = require('express')
const crypto = require('crypto')
const passport = require('passport')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const users = require('../models/users')
const jwt = require('jsonwebtoken')
const config = require('config')
const sha384 = crypto.createHash('sha384')

// @route   POST /auth/validate
// @desc    POST validate the legitimacy of the jwt provided
// @access  Public with jwt Authentication
router.post('/validate', passport.authenticate('jwt'), async (req, res) => {
  if (req.user) {
    res.sendStatus(200)
  } else {
    res
      .status(405)
      .json('Error 405: User authentication is not valid or expired')
  }
})

// @route   POST /auth/login
// @desc    POST login the requested user and return a jwt
// @access  Public
router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      //Validation checks to ensure the required fields are present
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const sha384 = crypto.createHash('sha384')
      const { username, password } = req.query

      //Find the user with the provided credentials
      let foundUser = await users.findOne({ username })
      if (
        !foundUser ||
        foundUser.password !== sha384.update(password).digest('hex') //Check the hashed password to ensure they're the same
      ) {
        return res.status(400).json('The username or password is incorrect.')
      }

      //Create a payload for the jwt to have accessible fields from the jwt
      const payload = {
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser.role,
        email: foundUser.email,
        iat: Math.floor(Date.now() / 1000),
        accountCreatedAt:foundUser.accountCreatedAt,
      }

      if (foundUser.role === 'student') {
        payload.parentUsername = foundUser.parentUsername
      }

      //Sign the jwt
      jwt.sign(
        payload,
        config.get('indexKey'),
        { expiresIn: 360000 },
        function (err, token) {
          if (err) throw err
          res.json({ token })
        }
      )

      return jwt //Return the encrypted jwt
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
