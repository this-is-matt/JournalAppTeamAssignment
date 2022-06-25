const routes = require('express').Router();
const themesControl = require('../controllers/themes');
const { themesValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuthEnd } = require('../middleware/auth');

routes.get('/', themesControl.getThemes);
routes.get('/:id', themesControl.getTheme);
routes.post('/', themesValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    themesControl.createTheme(req, res);
});
routes.put('/:id', themesValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    themesControl.updateTheme(req, res);
})
routes.delete('/:id', themesControl.deleteTheme);


module.exports = routes;