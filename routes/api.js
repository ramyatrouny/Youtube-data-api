const express = require('express').Router();
const { user, video } = require('./index');

// User
express.route('/user/me').get(user.self);
express.route('/user/:id/update').put(user.updateUser);

// Video
express.route('/videos').get(video.userVideos);
express.route('/videos/:id').get(video.videoDetails);

module.exports = express;