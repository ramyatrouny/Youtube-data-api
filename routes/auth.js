const express = require('express').Router();
const { auth } = require('./index');


// Authentication
express.route('/login').post(auth.login);
express.route('/register').post(auth.signup);
express.route('/refreshToken').post(auth.refreshToken);

module.exports = express;