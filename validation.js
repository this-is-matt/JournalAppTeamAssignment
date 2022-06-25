// eslint-disable-next-line no-unused-vars
const { body, validationResult } = require('express-validator');

exports.usersValidation = [
    body('googleId', 'Google IDs are formatted as numeric characters only').isNumeric(),
    body('displayName', 'Display names are limited to 20 characters and are Alpha characters for "en-US" locale').isAlpha('en-US', { ignore: ' ' }),
    body('firstName', 'Names are formatted as Alpha characters for "en-US" locale').isAlpha('en-US', { ignore: ' -,' }),
    body('lastName', 'Names are formatted as Alpha characters for "en-US" locale').isAlpha('en-US', { ignore: ' -,' }),
    body('image', 'Images are stored as https URL links').isURL()
];

exports.entriesValidation = [
    body('title', 'Titles are Alpha character strings').isAlpha('en-US', { ignore: ' -,' }),
    body('entry', 'Journal entries are Alphanumeric strings').isAlphanumeric('en-US', { ignore: ' -/()[]!&,.?:"\'' })
];

exports.profileValidation = [
    body('profileName', 'Profile names are Alpha character strings').isAlpha('en-US', { ignore: ' -,' }),
    body('mood','Moods are Alpha strings').isAlpha('en-US', { ignore: ' -,' }),
    body('interests', 'Interests are Alpha strings').isAlpha('en-US', { ignore: ' -,' }),
    body('introduction', 'Introductions are AlphaNumeric strings').isAlphanumeric('en-US', { ignore: ' -/()[]!&,.?:"\'' }),
    body('profileImageUrl', 'Images are stored as https URL links').isURL()
];

exports.themesValidation = [
    body('title', 'Titles are Alpha character strings.').isAlpha('en-US', { ignore: ' -,' }),
    body('creatorUsername', 'Usernames are Alpha character strings').isAlpha('en-US', { ignore: ' ' }),
    body('mainColor', 'Colors are Alpha character strings').isAlpha('en-US', { ignore: ' -' }),
    body('secondaryColor', 'Colors are Alpha character strings').isAlpha('en-US', { ignore: ' -' }),
    body('backgroundImage', 'Images are stored as https URL links').isURL(),
    body('searchTags', 'Tags are Alpha character strings').isAlpha('en-US', { ignore: ' -,' }),
    body('description', 'Descriptions are Alphanumeric character strings').isAlphanumeric('en-US', { ignore: ' -/()[]!&,.?:"\'' })
];