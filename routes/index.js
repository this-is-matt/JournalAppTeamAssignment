const routes = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Login/Dashboard Routes
// @desc Login/Landing page
// @route GET /
routes.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

routes.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      name: req.user.firstName,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc Api-docs
// @route GET /api-docs
routes.get('/api-docs', ensureAuth, async (req, res) => {
  res.render('api-docs', {
    name: req.user.firstName
  })
})

// Request routes
// @route GET /
routes
    .use('/entries', require('./entries'))
    .use('/profile', require('./profile'))
    .use('/themes', require('./themes'))
    .use('/users', require('./users'))
    .use('/auth', require('./auth'));
    

module.exports = routes;