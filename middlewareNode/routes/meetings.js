const express = require('express')
const passport = require('passport')
const crypto = require('crypto')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { waitingMentors, waitingStudents } = require('../models/waiting')
const meetings = require('../models/meetings')
const jwt = require('jsonwebtoken')

router.get('/inMeeting', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { username } = req.user
    let message = await inMeeting(username)
    res.status(200).json(message)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

router.post('/queue', passport.authenticate('jwt'), async (req, res) => {
  try {
    console.log(req.user)
    const { role, username, firstName, lastName } = req.user

    let message = await inMeeting(username)
    if (message !== 'There are no current meetings with this user.') {
      return res.status(400).json(message)
    }
    if (role === 'mentor') {
      const mentorUser = new waitingMentors({
        username,
        firstName,
        lastName,
        requestedGameAt: new Date(),
      })
      await mentorUser.save()
    } else if (role === 'student') {
      const studentUser = new waitingStudents({
        username,
        firstName,
        lastName,
        requestedGameAt: new Date(),
      })
      await studentUser.save()
    } else {
      return res
        .status(400)
        .json('You must be a mentor or student to find a game')
    }
    res.status(200)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

router.post('/pairUp', passport.authenticate('jwt'), async (req, res) => {
  try {
    const waitingMentors = waitingMentors.find({}).sort('requestedGameAt')
    if (!waitingMentors) {
      return res.status(200).json('No mentors available for matchmaking')
    }
    const waitingStudents = waitingStudents.find({}).sort('requestedGameAt')
    if (!waitingStudents) {
      return res.status(200).json('No students available for matchmaking')
    }

    if (waitingMentors.length < waitingStudents.length) {
      await Promise.all(
        waitingMentors.map(async (mentor) => {
          let deleted = deleteUser('mentor', mentor.username)
        })
      )
    }
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

router.delete('/dequeue', passport.authenticate('jwt'), async (req, res) => {
  try {
    const { role, username } = req.user
    let deleted = await deleteUser(role, username)
    if (!deleted) {
      return res.status(400).json('User was not queued for any meetings')
    }
    res.status(200).json('Removed user')
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server error')
  }
})

const genUniqueId = async (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
    .toUpperCase()
}

const inMeeting = async (role, username) => {
  let filters = { CurrentlyOngoing: true }
  if (role === 'student') {
    filters.studentUsername = username
  } else if (role === 'mentor') {
    filters.mentorUsername = username
  } else {
    return 'Please be either a student or a mentor.'
  }
  const foundUser = await meetings.find(filters)
  if (foundUser) {
    return 'User is already in a meeting.'
  }
  return 'There are no current meetings with this user.'
}

const deleteUser = async (role, username) => {
  let foundWaiting = {}
  if (role === 'student') {
    foundWaiting = await waitingStudents.findOneAndDelete({
      studentUsername: username,
    })
  } else if (role === 'mentor') {
    foundWaiting = await waitingMentors.findOneAndDelete({
      mentorUsername: username,
    })
  }
  if (!foundWaiting) {
    return false
  }
  return true
}
