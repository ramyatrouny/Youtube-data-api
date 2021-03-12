/**
 * @apiDefine updateUserInput
 * @apiParam {string} email                 user email address
 * @apiParam {string} full_name             user full name
 * @apiParam {string} youtube_channel_id    user youtube channel id
 * */
/**
 * @api { put } /api/user/:id/update Update logged in user information
 * @apiName updateUserDetails
 * @apiDescription update user details
 * @apiUse updateUserInput
 * @apiGroup User
 * @apiPermission isAuthenticated
 */

const fileName = __filename.split(/(\\|\/)/g).pop();
const logger = require('../../config/logger');
const Joi = require('joi');

const UserModel = require('../../model/UserModel');
const errorCode = require('../../util/errorCode');

const schema = Joi.object({
    email: Joi.string().email(),
    full_name: Joi.string(),
    youtube_channel_id: Joi.string(),
});

module.exports = async (req, res) => {
    logger.info(`${fileName}: Starting with the following values ${JSON.stringify(req.body)}`);

    try {
        // To validate that the request body is valid
        const validateBody = schema.validate({ ...req.body }, { abortEarly: false });
        if (validateBody.error) {
            return res.status(400).json(validateBody.error.details)
        }

        logger.info(`${fileName} Trying to update user ${req.user} with those new fields ${JSON.stringify(req.body)}`)
        // Only update the user object 
        const updateUser = await UserModel.findByIdAndUpdate(req.user, { "$set": req.body }, { new: true });

        if (!updateUser) {
            logger.warn(`${fileName} Unable to update the user and return new result`);

            return res.status(400).json({
                status: 'error',
                data: {
                    code: errorCode.validationError,
                    message: `Not allowed to signup with the following ${email}`
                }
            })
        }

        logger.info(`${fileName} User ${req.user} fields has been successfully updated`);

        return res.status(200).json({
            status: 'success',
            data: updateUser
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