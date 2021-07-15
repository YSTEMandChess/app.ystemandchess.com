const express = require('express')
const passport = require('passport')
const router = express.Router()
const crypto = require('crypto')
const { check, validationResult } = require('express-validator')
const users = require('../models/users')

// @route   GET /user/children
// @desc    GET the parent user's children username and their timePlayed fields
// @access  Public with jwt Authentication
router.get('/children', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { role, username } = req.user
    if (role !== 'parent') {
      res
        .status(400)
        .json('You must have a parent account to access your children')
    } else {
      //Find all children for the parent user and retrieve only the username and timePlayed field
      const childrenArray = await users
        .find({ parentUsername: username })
        .select(['timePlayed', 'username'])
      res.status(200).json(childrenArray)
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

// @route   POST /user/
// @desc    POST Signup the requested user with the provided credentials
// @access  Public
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

    const { username, password, first, last, email, role, students } = req.query

    //Error catching when using mongoose functions like Users.findOne()
    try {
      const sha384 = crypto.createHash('sha384')
      hashedPassword = sha384.update(password).digest('hex')

      //Error checking to see if a user with the same username exists
      const user = await users.findOne({ username })
      if (user) {
        return res
          .status(400)
          .json('This username has been taken. Please choose another.')
      }

      //Set the account created date for the new user
      const currDate = new Date()

      //Switch statement for functionality depending on role
      if (role === 'parent') {
        let studentsArray = JSON.parse(students)
        //Check if students array is present and is populated
        if (studentsArray && studentsArray.length > 0) {
          //Ensure student usernames aren't already in the database
          for (i = 0; i < studentsArray.length; i++) {
            const studentUser = await users.findOne({
              username: studentsArray[i].username,
            })
            if (studentUser) {
              return res
                .status(400)
                .json('This username has been taken. Please choose another.')
            }
          }

          //Insert the students into the database one at a time
          await Promise.all(
            studentsArray.map(async (student) => {
              const sha384 = crypto.createHash('sha384')
              const newStudent = new users({
                username: student.username,
                password: sha384.update(student.password).digest('hex'),
                firstName: student.first,
                lastName: student.last,
                parentUsername: username,
                role: 'student',
                accountCreatedAt: currDate.toLocaleString(),
                timePlayed: 0,
              })
              await newStudent.save()
            })
          )
        }
      }
      const mainUser = new users({
        username,
        password: hashedPassword,
        firstName: first,
        lastName: last,
        email,
        role,
        accountCreatedAt: currDate.toLocaleString(),
      })
      await mainUser.save()

      res.status(200).json('Added users')
    } catch (error) {
      console.error(error.message)
      res.status(500).json('Server error')
    }
  }
)

// @route   POST /user/children
// @desc    POST Signup the student with the parent account
// @access  Public with jwt Authentication
router.post(
  '/children',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('first', 'First name is required').not().isEmpty(),
    check('last', 'Last name is required').not().isEmpty(),
  ],
  passport.authenticate('jwt'),
  async (req, res) => {
    //Field validations for checks
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, password, first, last } = req.query

    try {
      const sha384 = crypto.createHash('sha384')
      hashedPassword = sha384.update(password).digest('hex')

      const user = await users.findOne({ username })
      if (user) {
        return res
          .status(400)
          .json('This username has been taken. Please choose another.')
      }

      //Set the account created date for the new user
      const currDate = new Date()

      const newStudent = new users({
        username,
        password: hashedPassword,
        firstName: first,
        lastName: last,
        parentUsername: req.user.username,
        role: 'student',
        accountCreatedAt: currDate.toLocaleString(),
        recordingList: [],
      })
      await newStudent.save()
      return res.status(200).json('Added student')
    } catch (error) {
      console.error(error.message)
      res.status(500).json('Server error')
    }
  }
)

// @route   POST /user/selectByFirstName
// @desc    POST return the users corresponding to the first name queried
// @access  Public
router.post(
  '/selectByFirstName',
  [
    check('first', 'First name is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      /* Not sure if this is necessary for this route
      //Validation checks to ensure the required fields are present
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      */
      const { first } = req.query

      //Find all users
      let foundUsers = await users.find()
      let returnArray = [];

      // Find all users with a corresponding first name 
      for (let i = 0; i < Object.keys(foundUsers).length ; i++) {
        if (foundUsers[i].firstName.includes(first) && first != " ") {
          let fullName = foundUsers[i].firstName+' '+foundUsers[i].lastName;
          returnArray.push(fullName);
        };
      }

      if ( returnArray.length == 0  ) {
        res.status(200).send('No users were found.')
      } else {
        res.status(200).send(returnArray);
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

// @route   POST /users/selectByFullName
// @desc    POST return the users corresponding to the first and last name queried
// @access  Public
router.post(
  '/selectByFullName',
  [
    check('first', 'First name is required').not().isEmpty(),
    check('last', 'Last name is required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      /* Not sure if this is necessary for this route
      //Validation checks to ensure the required fields are present
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      */
      const { first , last } = req.query

      //Find all users
      let foundUsers = await users.find({ first })
      let returnArray = [];

      // Find all users with a corresponding first name 
      for (let i = 0; i < Object.keys(foundUsers).length ; i++) {
        if (foundUsers[i].lastName.includes(last)) {
          let fullName = foundUsers[i].firstName+' '+foundUsers[i].lastName;
          returnArray.push(fullName);
        };
      }

      // If returnArray is empty, no users were found
      if ( returnArray.length == 0 ) {
        res.status(200).send('No users were found.')
      } else {
        res.status(200).send(returnArray);
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
