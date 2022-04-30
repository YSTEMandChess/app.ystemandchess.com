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

// @route   GET /profile/singleRecording
// @desc    GET a presigned URL from AWS S3
// @access  Public with jwt Authentication
router.get(
  '/singleRecording',
  [check('filename', 'The filename is required').not().isEmpty()],
  passport.authenticate('jwt'),
  async (req, res) => {
    try {
      const s3Config = {
        apiVersion: 'latest',
        region: 'us-east-2',
        accessKeyId: config.get('awsAccessKey'),
        secretAccessKey: config.get('awsSecretKey'),
      }

      var s3 = new AWS.S3(s3Config)

      const params = {
        Bucket: 'ystemandchess-meeting-recordings',
        Key: req.query.filename,
        Expires: 604800,
      }

      const url = s3.getSignedUrl('getObject', params)
      res.status(200).json(url)
    } catch (error) {
      console.error(error.message)
      res.status(500).json('Server error')
    }
  }
)

// @route   GET /meetings/recordings
// @desc    GET all recordings available for the student or mentor
// @access  Public with jwt Authentication
router.get('/recordings', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { role, username, firstName, lastName } = req.user
    let filters = { CurrentlyOngoing: false }
    if (role === 'student') {
      filters.studentUsername = username
      filters.studentFirstName = firstName
      filters.studentLastName = lastName
    } else if (role === 'mentor') {
      filters.mentorUsername = username
      filters.mentorFirstName = firstName
      filters.mentorLastName = lastName
    } else {
      return res
        .status(404)
        .json('Must be a student or mentor to get your own recordings')
    }

    const recordings = await meetings.find(filters) //Find all meetings with the listed filters above

    //Error handling for query
    if (!recordings) {
      res.status(400).json('User did not have any recordings available')
    } else {
      res.send(recordings)
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

// @route   GET /profile/parents/recordings
// @desc    GET all recordings available for the student from a parent account
// @access  Public with jwt Authentication
router.get(
  '/parents/recordings',
  [check('childUsername', "The child's username is required").not().isEmpty()],
  passport.authenticate('jwt'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { role, username } = req.user
    const { childUsername } = req.query

    try {
      if (role === 'parent') {
        const child = await users.findOne({
          parentUsername: username,
          username: childUsername,
        })
        if (!child) {
          return res
            .status(400)
            .json('You are not the parent to the requested child.')
        }
        const recordings = await meetings
          .find({
            studentUsername: childUsername,
            filesList: { $ne: null },
          })
          .select(['filesList', 'meetingStartTime', '-_id']) //Select only fileName and meetingStartTime fields for all found entries

        //Error checking for no recordings
        if (recordings.length === 0) {
          res
            .status(400)
            .json('Could not find any recordings for the requested child.')
        } else {
          res.send(recordings)
        }
      } else {
        res.status(404).json('You are not the parent of the requested child.')
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json('Server error')
    }
  }
)

module.exports = router
