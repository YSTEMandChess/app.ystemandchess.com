const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const users = require('../models/users')
const jwt = require('jsonwebtoken')

router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { username, password } = req.body
      let foundUser = await users.findOne({ username })
      if (!foundUser || foundUser.password !== hash('sha384', password)) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid username or password provided' }] })
      }

      let payload = [
        {
          username: foundUser.username,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          role: foundUser.role,
          email: foundUser.email,
        },
      ]
      if (foundUser.role === 'student') {
        payload[0].parentUsername = foundUser.parentUsername
      } else {
        payload[0].email = foundUser.email
      }

      jwt.sign(
        payload,
        $_ENV['indexKey'],
        'HS512',
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)
