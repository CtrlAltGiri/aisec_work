'use strict'

var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var generateRandomString = function(length){
	crypto.randomBytes(Math.ciel(length/2))
}

module.exports = router;
