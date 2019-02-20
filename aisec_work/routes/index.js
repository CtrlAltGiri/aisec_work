'use strict'

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var users = require('./users')

/* GET home page. */

router.post('/login',users.login);

var generateRandomString = function(length){
	crypto.randomBytes(Math.ciel(length/2))
}

module.exports = router;
