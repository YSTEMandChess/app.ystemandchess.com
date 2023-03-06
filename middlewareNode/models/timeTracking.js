const mongoose = require('mongoose')
const { Schema, model } = mongoose

const timeTrackingSchema = new mongoose.Schema(
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
        timePlayed: {
            type: Number,
            required: true,
            default: 0
        },
        computerGameTime: {
            type: Number,
            required: true,
            default: 0
        },
        mentorLessonTime: {
            type: Number,
            required: true,
            default: 0
        },
    },
    { versionKey: false }
)

module.exports = timeTracking = model('timeTracking', timeTrackingSchema)