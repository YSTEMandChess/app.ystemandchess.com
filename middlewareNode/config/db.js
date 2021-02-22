require('dotenv').config()
const mongoose = require('mongoose')
const config = require('config')
const db = process.env.MONGO_CREDENTIALS

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message)
    process.exit(1) // Exit process if connection fails
  }
}

module.exports = connectDB
