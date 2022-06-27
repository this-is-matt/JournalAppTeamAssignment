const routes = require('express').Router();
const profileControl = require('../controllers/profile');
const { profileValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuthEnd } = require('../middleware/auth');


// Request routes
// @route GET /profile
routes.get('/', profileControl.getProfiles);
routes.get('/:id', profileControl.getProfile);
routes.post('/', profileValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    profileControl.createProfile(req, res);
});
routes.put('/:id', profileValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    profileControl.updateProfile(req, res);
})
routes.delete('/:id', profileControl.deleteProfile);


module.exports = routes;