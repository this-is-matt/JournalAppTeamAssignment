const routes = require('express').Router();
const themesControl = require('../controllers/themes');
const { themesValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuth2 } = require('../middleware/auth');


// Request routes
// @route GET /themes
routes.get('/', ensureAuth2, themesControl.getThemes);
routes.get('/:id', ensureAuth2, themesControl.getTheme);
routes.post('/', ensureAuth2, themesValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    themesControl.createTheme(req, res);
});
routes.put('/:id', ensureAuth2, themesValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    themesControl.updateTheme(req, res);
})
routes.delete('/:id', ensureAuth2, themesControl.deleteTheme);


module.exports = routes;