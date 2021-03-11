/**
 * @apiDefine loginInput
 * @apiParam {string} email     user email address
 * @apiParam {string} password  user password
 * */
/**
 * @api { post } /auth/login User Login
 * @apiName login
 * @apiDescription Authenticate a user
 * @apiUse loginInput
 * @apiGroup Authentication
 * @apiPermission isPublic
 */

const fileName = __filename.split(/(\\|\/)/g).pop();
const logger = require('../../config/logger');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../../model/UserModel');
const errorCode = require('../../util/errorCode');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = async (req, res) => {
    logger.info(`${fileName}: Starting with the following values ${JSON.stringify(req.body)}`);

    try {
        // To validate that the request body is valid
        const validateBody = schema.validate({ ...req.body }, { abortEarly: false });
        if (validateBody.error) {
            return res.status(400).json(validateBody.error.details)
        }

        const { email, password } = req.body;

        logger.info(`${fileName} Checking if the user ${email} exists`);
        const userExists = await UserModel.findOne({ email }).select('-__v -createdAt -updatedAt');

        if (!userExists || userExists.length === 0) {
            logger.warn(`${fileName} User does not exists`);

            // Security note: To avoid data leak it's better not to say if the user exists or not
            return res.status(400).json({
                status: 'error',
                data: {
                    code: errorCode.validationError,
                    message: `Not allowed to login`
                }
            })
        }

        logger.info(`${fileName} Checking if the password provided is a valid password`);
        const isMatch = await bcrypt.compare(password, userExists.password);

        if (!isMatch) {
            logger.info(`${fileName} Password provided is incorrect`);

            return res.status(400).json({
                status: 'error',
                data: {
                    code: errorCode.validationError,
                    message: `Email or Password are incorrect`
                }
            })
        }


        logger.info(`${fileName} Trying to generate the user JWT key`);
        const jwtPayload = {
            id: userExists._id
        }
        const jwtToken = await jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.status(200).json({
            status: 'success',
            data: {
                user: userExists,
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