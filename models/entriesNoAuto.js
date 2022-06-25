const mongoose = require('mongoose');

const EntryNoAutoSchema = new mongoose.Schema(
    {
        _id: false,
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

module.exports = mongoose.model('EntriesNoAuto', EntryNoAutoSchema, 'Entries');