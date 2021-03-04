const mongoose = require('mongoose')
const { Schema, model } = mongoose

const usersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: mongoose.Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
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
  role: {
    type: String,
    required: true,
  },
  accountCreatedAt: {
    type: String,
    required: false,
  },
  timePlayed: {
    type: String,
    required: false,
  },
  lessonsCompleted: {
    type: [{ type: Object }],
    required: false,
    default: [],
  },
  children: {
    type: [{ type: String }],
    required: false,
    default: [],
  },
  recordingList: {
    type: [{ type: Object }],
    required: false,
    default: [],
  },
})

module.exports = users = model('users', usersSchema)
