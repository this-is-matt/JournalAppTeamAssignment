const cors =require('cors');
const bodyParser = require('body-parser');
//Imports for oAuth
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
// setup express
const express = require('express');
//Passport config
require('../passport.js')(passport);
// setup dotenv
require('dotenv/config');
//set up swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
//set connect for use of initDB function from ./dbConnect/dbConnection.js
const connect = require('../dbConnect/dbConnection.js');


function createServer() {
    
    const app = express();

    //Handlbars
    app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
    app.set('view engine', '.hbs')

    //Sessions
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
      })
    }))

    //Passport middleware
    app.use(passport.initialize())
    app.use(passport.session())

    connect.initDB();

    //set Server routing/headers
    app
    .use(bodyParser.json())
    .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    .use('/', require('../routes'))
    .use(cors())

    return app;
}

module.exports = { createServer };