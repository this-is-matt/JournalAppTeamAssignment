const routes = require('express').Router();
const usersControl = require('../controllers/users');
const { usersValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuthEnd } = require('../middleware/auth');


// Request routes
// @route GET /users
routes.get('/', usersControl.getUsers);
routes.get('/:id', usersControl.getUser);
routes.post('/', usersValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    usersControl.createUser(req, res);
});
routes.put('/:id', usersValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    usersControl.updateUser(req, res);
})
routes.delete('/:id', usersControl.deleteUser);

module.exports = routes;