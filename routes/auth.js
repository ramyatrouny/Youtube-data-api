const express = require('express').Router();
const { auth } = require('./index');

// Authentication
express.route('/auth/login').post(auth.login);
express.route('/auth/register').post(auth.signup);

module.exports = express;