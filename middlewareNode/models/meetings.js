const mongoose = require('mongoose')
const { Schema, model } = mongoose

const meetingsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: mongoose.Types.ObjectId(),
  },
  meetingId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentUsername: {
    type: String,
    required: true,
  },
  studentFirstName: {
    type: String,
    required: true,
  },
  studentLastName: {
    type: String,
    required: true,
  },
  mentorUsername: {
    type: String,
    required: true,
  },
  mentorFirstName: {
    type: String,
    required: true,
  },
  mentorLastName: {
    type: String,
    required: true,
  },
  CurrentlyOngoing: {
    type: Boolean,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  sid: {
    type: String,
    required: true,
  },
  meetingStartTime: {
    type: Date,
    required: true,
  },
})

module.exports = meetings = model('meetings', meetingsSchema)
