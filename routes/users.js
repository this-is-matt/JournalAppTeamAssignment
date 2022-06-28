const routes = require('express').Router();
const usersControl = require('../controllers/users');
const { usersValidation } = require('../validation');
const { validationResult } = require('express-validator');
const { ensureAuth2 } = require('../middleware/auth');




// Request routes
// @route GET /users
routes.get('/', ensureAuth2, usersControl.getUsers);
routes.get('/:id', ensureAuth2, usersControl.getUser);
routes.post('/', ensureAuth2, usersValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    usersControl.createUser(req, res);
});
routes.put('/:id', ensureAuth2, usersValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    usersControl.updateUser(req, res);
})
routes.delete('/:id', ensureAuth2, usersControl.deleteUser);

module.exports = routes;