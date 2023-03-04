const mongoose = require('mongoose')
const { Schema, model } = mongoose

const gamesSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
          },
        currentlyOngoing: {
            type: Boolean,
            required: false,
        },
        meetingStartTime: {
            type: Date,
            required: false,
        },
        meetingEndTime: {
            type: Date,
            required: false,
        },
    },
    { versionKey: false }
)

module.exports = games = model('games', gamesSchema)