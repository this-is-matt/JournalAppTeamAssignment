//set up mongoose
const mongoose = require('mongoose');

//misc
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors =require('cors');

// setup express
const express = require('express');
const app = express();

// setup dotenv
require('dotenv/config');

//set up swagger
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


mongoose.connect(process.env.MONGODB_URI, 
() => console.log("connected to DB"), 
e => console.error(e));


app
.use(bodyParser.json())
.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
.use('/', require('./routes'))
.use((req,res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader(
        'Access-Controll-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


//set the port and return the port number
app.listen(port, () => console.log(`App listening on ${port}`))