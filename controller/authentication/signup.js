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
const jwt = require('jsonwebtoken');

const UserModel = require('../../model/UserModel');
const errorCode = require('../../util/errorCode');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    full_name: Joi.string().required(),
    youtube_channel_id: Joi.string().required(),
});

module.exports = async (req, res) => {
    logger.info(`${fileName}: Starting with the following values ${JSON.stringify(req.body)}`);

    try {
        // To validate that the request body is valid
        const validateBody = schema.validate({ ...req.body }, { abortEarly: false });
        if (validateBody.error) {
            return res.status(400).json(validateBody.error.details)
        }

        const { email, password, full_name, youtube_channel_id } = req.body;


        logger.info(`${fileName} Checking if the user ${email} already exists`);
        const userExists = await UserModel.findOne({ email });
        console.log(userExists);

        if (userExists) {
            logger.warn(`${fileName} User already exists`);

            // Security note: To avoid data leak it's better not to say that the user already exists
            return res.status(400).json({
                status: 'error',
                data: {
                    code: errorCode.validationError,
                    message: `Not allowed to signup with the following ${email}`
                }
            })
        }

        logger.info(`${fileName} Preparing to create a new user`);
        const newUser = new UserModel({ email, password, full_name, youtube_channel_id });

        logger.info(`${fileName} Trying to encrypt the user password`);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        logger.info(`${fileName} Trying to save the new user`);
        const newUserRes = await newUser.save();

        logger.info(`${fileName} Trying to generate JWT Token to immediately allow the user login on signup`);
        const jwtPayload = { id: newUserRes._id };

        const jwtToken = await jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '24h' });

        logger.info(`${fileName} Success`);
        return res.status(200).json({
            status: 'success',
            data: {
                user: newUserRes,
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