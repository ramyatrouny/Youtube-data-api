/**
 * @api { get } /api/user/me Logged in User Details
 * @apiName Personal Details
 * @apiDescription Get the current user details
 * @apiGroup User
 * @apiPermission isAuthenticated
 */


const fileName = __filename.split(/(\\|\/)/g).pop();
const logger = require('../../config/logger');
const UserModel = require('../../model/UserModel');
const errorCode = require('../../util/errorCode');

module.exports = async (req, res) => {
	try {

		logger.info(`${fileName} Checking if the user ${req.user} exists`);
		const user = await UserModel.findById(req.user).select('-__v -createdAt -updatedAt -password');

		if (!user) {
			logger.warn(`${fileName} User does not exists`);

			// Security note: To avoid data leak it's better not to say if the user exists or not
			return res.status(400).json({
				status: 'error',
				data: {
					code: errorCode.validationError,
					message: `User does not exist`
				}
			})
		}

		return res.status(200).json({
			status: 'success',
			data: user
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