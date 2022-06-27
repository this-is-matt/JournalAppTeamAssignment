const routes = require('express').Router();
const entriesControl = require('../controllers/entries');
const { entriesValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuthEnd } = require('../middleware/auth');


// Request routes
// @route GET /entries
routes.get('/', entriesControl.getEntries);
routes.get('/:id', entriesControl.getEntry);
routes.post('/', entriesValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    entriesControl.createEntry(req, res);
});
routes.put('/:id', entriesValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    entriesControl.updateEntry(req, res);
})
routes.delete('/:id', entriesControl.deleteEntry);

module.exports = routes;