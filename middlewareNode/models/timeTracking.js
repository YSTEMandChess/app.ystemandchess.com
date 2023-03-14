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
            enum: ["mentor", "lesson", "play", "puzzle"],
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
        }
    },
    { versionKey: false }
)

module.exports = timeTracking = model('timeTracking', timeTrackingSchema)