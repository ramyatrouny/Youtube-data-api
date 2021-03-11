/**
 * @apiDefine registerInput
 * @apiParam {string} email                 user email address
 * @apiParam {string} password              user password
 * @apiParam {string} full_name             user full name
 * @apiParam {string} youtube_channel_id    user youtube channel id
 * */
/**
 * @api { post } /auth/register User signup
 * @apiName register
 * @apiDescription Register a new user
 * @apiUse registerInput
 * @apiGroup Authentication
 * @apiPermission isPublic
 */

const fileName = __filename.split(/(\\|\/)/g).pop();
const logger = require('../../config/logger');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userModel = require('../../models/UserModel');

module.exports = (req, res) => {

}