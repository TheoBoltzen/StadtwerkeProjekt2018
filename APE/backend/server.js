
const http = require('http')
const app = require('./index')
/*
//Set port for server
const port = parseInt(process.env.PORT, 10) || 5000
app.set('port', port)

const server = http.createServer(app)       //for our app

server.listen(port, () => console.log('Server started'))
*/


//new from tutorial

require('rootpath')();
const express = require('express');
//const app = express();                //vorkonfiguriert aus index.js
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
//app.use('/users', require('./users/user.controller'));

// global error handler
app.use(errorHandler);

// start server
/*
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);

});
*/
//#################von oben - unser Code, ersetzt das obere######################
const port = parseInt(process.env.PORT, 10) || 5000
app.set('port', port)

const server = http.createServer(app)       //for our app

server.listen(port, () => console.log('Server started'))