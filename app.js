const express = require('express');
//misc
const port = process.env.PORT || 3000;

const server = require('./utils/server.js');
const app = server.createServer();

//set the port and return the port number
app.listen(port, () => console.log(`App listening on ${port}`))