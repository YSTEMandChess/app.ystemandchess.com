const mongoose = require('mongoose')
const { Schema, model } = mongoose

const timeTrackingSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        eventType: {
            type: String, 
            enum: ["mentor", "lesson", "play", "puzzle", "website"],
            required: true
        },
        eventId:{
            type: String,
            required: true
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date
        },
        totalTime: {
            type: Number // Seconds
        }
    },
    { versionKey: false }
)

module.exports = timeTracking = model('timeTracking', timeTrackingSchema)