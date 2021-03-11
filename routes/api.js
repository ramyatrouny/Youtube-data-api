const express = require('express').Router();
const { auth, user, video } = require('./index');


// Authentication
express.route('/auth/login').post(auth.login);
express.route('/auth/signup').post(auth.signup);
express.route('/auth/refresh').post(auth.refreshToken);

// User
express.route('/user/me').get(user.self);
express.route('/user/:id/update').put(user.updateUser);

// Video
express.route('/videos').get(video.userVideos);
express.route('/videos/:id').get(video.videoDetails);

module.exports = express;