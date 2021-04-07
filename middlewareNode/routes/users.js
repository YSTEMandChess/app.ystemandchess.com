const express = require('express')
const passport = require('passport')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const users = require('../models/users')
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')
//const config = require('config')

router.get('/children', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { role, username } = req.user
    if (role !== 'parent') {
      res
        .status(400)
        .json('You must have a parent account to access your children')
    } else {
      const childrenArray = await users.find({ parentUsername: username })
      res.send(childrenArray)
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('first', 'First name is required').not().isEmpty(),
    check('last', 'Last name is required').not().isEmpty(),
    check('email', 'Email address is required').not().isEmpty(),
    check('role', 'Role is required').not().isEmpty(),
  ],
  async (req, res) => {
    //Field validations for checks
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, password, first, last, email, role, students } = req.body

    //Error catching when using mongoose functions like Users.findOne()
    try {
      //Error checking to see if a user with the same username exists
      const user = users.findOne({ username })
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        return
      }

      //Set the account created date for the new user
      const currDate = new Date()

      //Switch statement for functionality depending on role
      if (role === 'parent') {
        let childrens = []

        //Check if students array is present and is populated
        if (students && students.length > 0) {
          //Ensure student usernames aren't already in the database
          for (i = 0; i < students.length; i++) {
            const studentUser = users.findOne({
              username: students[i].username,
            })
            if (studentUser) {
              res.status(400).json({
                errors: [
                  {
                    msg:
                      'Student username' + students.username + 'already exists',
                  },
                ],
              })
              return
            }
          }

          //Insert the students into the database one at a time
          students.map(async (student) => {
            childrens.push(student.username)
            const newStudent = new users({
              username: student.username,
              firstName: student.first,
              lastName: student.last,
              accountCreatedAt: currDate.toLocaleString(),
              parentUsername: username,
              password: student.password,
              role: 'student',
            })
            await newStudent.save()
          })
        }

        //Insert the parent into the database
        const parentUser = new users({
          username,
          password,
          firstName: first,
          lastName: last,
          email,
          role,
          children: childrens,
          accountCreatedAt: currDate.toLocaleString(),
        })
        await parentUser.save()
      } else {
        const mentorUser = new users({
          username,
          password,
          firstName: first,
          lastName: last,
          email,
          role,
          accountCreatedAt: currDate.toLocaleString(),
          recordingList: [],
        })
        await mentorUser.save()
      }
      res.sendStatus(200)
    } catch (error) {
      console.error(error.message)
      res.status(500).json('Server error')
    }
  }
)

module.exports = router
