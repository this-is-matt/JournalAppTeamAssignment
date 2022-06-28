const routes = require('express').Router();
const entriesControl = require('../controllers/entries');
const { entriesValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuth2 } = require('../middleware/auth');


// Request routes
// @route GET /entries
routes.get('/', ensureAuth2, entriesControl.getEntries);
routes.get('/:id', ensureAuth2, entriesControl.getEntry);
routes.post('/', ensureAuth2, entriesValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    entriesControl.createEntry(req, res);
});
routes.put('/:id', ensureAuth2, entriesValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    entriesControl.updateEntry(req, res);
})
routes.delete('/:id', ensureAuth2, entriesControl.deleteEntry);

module.exports = routes;