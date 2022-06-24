const routes = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Login/Dashboard Routes


// Request routes
// @route GET /
routes
    .use('/entries', require('./entries'))
    .use('/profile', require('./profile'))
    .use('/themes', require('./themes'))
    .use('/user', require('./user'));
    

module.exports = routes;