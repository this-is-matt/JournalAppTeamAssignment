const routes = require('express').Router();
const profileControl = require('../controllers/profile');
const { profileValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuth2 } = require('../middleware/auth');


// Request routes
// @route GET /profile
routes.get('/', ensureAuth2, profileControl.getProfiles);
routes.get('/:id', ensureAuth2, profileControl.getProfile);
routes.post('/', ensureAuth2, profileValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    profileControl.createProfile(req, res);
});
routes.put('/:id', ensureAuth2, profileValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    profileControl.updateProfile(req, res);
})
routes.delete('/:id', ensureAuth2, profileControl.deleteProfile);


module.exports = routes;