const express = require('express')
const passport = require('passport')
const router = express.Router()
const crypto = require('crypto')
const { check, validationResult,query  } = require('express-validator')
const users = require('../models/users')
const jwt = require('jsonwebtoken')
const AWS = require('aws-sdk')
const axios = require('axios')
const config = require('config')
const { waitingStudents, waitingMentors } = require('../models/waiting')
const meetings = require('../models/meetings')
var isBusy = false //State variable to see if a query is already running.


// @route   GET /profile
// @desc    user get user profile
// @access  Public with jwt Authentication
router.get('/', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { role, username } = req.user
    const user = await users.find({ username: username })
    res.status(200).json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})


// @route   GET /profile/children
// @desc    user parent get children username and their timePlayed fields
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

// @route   GET /profile/recordings
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