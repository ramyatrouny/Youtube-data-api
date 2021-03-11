/**
 * @api { post } /auth/refresh Refresh user access token
 * @apiName refreshToken
 * @apiDescription Refresh user token
 * @apiGroup Authentication
 * @apiPermission isAuthenticated
 */

const fileName = __filename.split(/(\\|\/)/g).pop();
const logger = require('../../config/logger');
const jwt = require('jsonwebtoken');

const UserModel = require('../../model/UserModel');
const errorCode = require('../../util/errorCode');


module.exports = async (req, res) => {
    logger.info(`${fileName}: Starting with the following values ${JSON.stringify(req.body)}`);

    try {
        // To validate that the request body is valid


    } catch (error) {

    }
}