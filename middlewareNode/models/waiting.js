const mongoose = require('mongoose')
const { Schema, model } = mongoose

const waitingSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: mongoose.Types.ObjectId(),
  },
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
})

let waitingStudents = model('waitingStudents', waitingSchema)
let waitingMentors = model('waitingMentors', waitingSchema)

module.export = {
  waitingMentors: waitingMentors,
  waitingStudents: waitingStudents,
}
