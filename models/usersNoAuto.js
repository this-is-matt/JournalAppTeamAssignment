const mongoose = require('mongoose');

const UsersAutoSchema = new mongoose.Schema(
    {
        _id: false,
        googleId: {
            type: String,
            unique: true,
            required: true
        },
        displayName: {
            type: String,
            unique: true,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        image: {
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

module.exports = mongoose.model('UsersNoAuto', UsersAutoSchema, 'Users');