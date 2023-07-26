const mongoose = require('mongoose')
const { Schema, model } = mongoose

const undoPermissionSchema = new mongoose.Schema(
    {
        meetingId: {
            type: String,
            required: false,
        },
        permission: {
            type: Boolean,
            required: false,
        },
    },
    { versionKey: false }
)

module.exports = undoPermission = model('undoPermission', undoPermissionSchema)
