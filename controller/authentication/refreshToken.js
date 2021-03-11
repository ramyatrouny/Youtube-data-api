/**
 * @api { post } /auth/refreshToken Refresh  token
 * @apiName refreshToken
 * @apiDescription Refresh user token
 * @apiGroup User
 * @apiPermission Authentication
 */

const fileName = __filename.split(/(\\|\/)/g).pop();
const logger = require('../../config/logger');
const jwt = require('jsonwebtoken');

const UserModel = require('../../model/UserModel');
const errorCode = require('../../util/errorCode');

module.exports = async (req, res) => {
    logger.info(`${fileName}: Starting with the following values ${JSON.stringify(req.headers)}`);

    try {
        logger.info(`${fileName} Trying to retrieve the authorization token`);
        let token = req.headers['authorization'];

        if (!token || !token.startsWith('Bearer')) {
            logger.warn(`${fileName} request has no token or does not start with bearer`);
            return res.status(401).json({
                status: 'error',
                data: {
                    code: errorCode.unauthenticated,
                    message: 'User unauthenticated'
                }
            })
        }

        logger.info(`${fileName} Trying to trim the token without bearer`)
        token = token.slice(7, token.length).trimLeft();

        logger.info(`${fileName} Trying to decode the JWT token to retrieve the user`);
        // Note: Assume that the JWT token is expired, taking into consideration that 
        // verify will fail however decode will return the JWT key payload
        const { id } = await jwt.decode(token, process.env.JWT_SECRET);
        logger.info(`${fileName} Trying to check if the user exists`);
        const userExists = await UserModel.findById(id);

        if (!userExists) {
            logger.warn(`${fileName} User does not exist`)
            return res.status(400).json({
                status: 'error',
                data: {
                    code: errorCode.validationError,
                    message: `Not allowed to generate a new token`
                }
            })
        }

        logger.info(`${fileName} Trying to prepare a payload for the new JWT Token`);
        const jwtPayload = {
            id: userExists._id
        };

        const jwtToken = await jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.status(200).json({
            status: 'success',
            data: {
                token: jwtToken
            }
        })

    } catch (error) {
        logger.error(`${fileName} Internal Server error ${error}`)
        return res.status(500).json({
            status: 'error',
            data: {
                code: errorCode.unexpectedError,
                message: 'Internal server error'
            }
        })
    }
}