const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        profileName: {
            type: String,
            required: true
        },
        mood: {
            type: String,
            required: true
        },
        interests: {
            type: String,
            required: true
        },
        introduction: {
            type: String,
            required: true
        },
        profileImageUrl: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { versionKey: false }
);

module.exports = mongoose.model('Profile', profileSchema, 'Profile');