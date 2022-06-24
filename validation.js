// eslint-disable-next-line no-unused-vars
const { body, validationResult } = require('express-validator');

exports.usersValidation = [
    body('googleId', 'Google IDs are formatted as numberic characters only.', ).isNumeric(),
    body('displayName', 'Display names are limited to 20 characters and are Alpha characters for "en-US" locale.').isAlpha('en-US', { ignore: ' -,' }),
    body('firstName', 'Names are formatted as Alpha characters for "en-US" locale.').isAlpha('en-US', { ignore: ' -,' }),
    body('lastName', 'Names are formatted as Alpha characters for "en-US" locale.').isAlpha('en-US', { ignore: ' -,' }),
    body('image', 'Images are stored as https URL links.').isURL()
];