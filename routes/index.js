const { response } = require('express');

const routes = require('express').Router();

routes
    .use('/entries', require('./entries'))
    .use('/profile', require('./profile'))
    .use('/themes', require('./themes'))
    .use('/user', require('./user'));
    

module.exports = routes;