const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        entry: {
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

module.exports = mongoose.model('Entries', EntrySchema, 'Entries');