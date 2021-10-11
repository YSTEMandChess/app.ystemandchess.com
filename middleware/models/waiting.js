const mongoose = require('mongoose')
const { Schema, model } = mongoose

const waitingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    requestedGameAt: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false }
)

var waitingStudents = model('waitingStudents', waitingSchema, 'waitingStudents')
var waitingMentors = model('waitingMentors', waitingSchema, 'waitingMentors')

module.exports = { waitingStudents, waitingMentors }
