const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const response = require('./utils/responseFormat.js');
const routes = require('./routes');
var mysql = require("mysql");
var config = require('config');
var bcrypt = require("bcryptjs");
var crypto = require('crypto');


var app = express()



app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(response);

app.use('/', routes);








const port = process.env.PORT || 3000;

app.listen(port, err => {
    console.log(err || 'Listening on port ' + port);
});
