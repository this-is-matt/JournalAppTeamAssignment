const mongoose = require('mongoose');

const themesSchema = new mongoose.Schema(
    {
        themeTitle: {
            type: String,
            required: true
        },
        creationUsername: {
            type: String,
            required: true
        },
        mainColor: {
            type: String,
            required: true
        },
        secondaryColor: {
            type: String,
            required: true
        },
        backgroundImage: {
            type: String,
            required: true
        },
        searchTags: {
            type: String,
            required: true
        },
        description: {
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

module.exports = mongoose.model('Themes', themesSchema, 'Themes');