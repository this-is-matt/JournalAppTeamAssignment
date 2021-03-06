const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
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

module.exports = mongoose.model('Users', UserSchema, 'Users');