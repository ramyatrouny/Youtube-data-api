/**
 * @api { get } /api/videos/:id Get the videos details
 * @apiName userVideoDetails
 * @apiDescription get the current video details
 * @apiGroup Video
 * @apiPermission isAuthenticated
 */

const fileName = __filename.split(/(\\|\/)/g).pop();
const logger = require('../../config/logger');
const axios = require('axios');
const Joi = require('joi');

const errorCode = require('../../util/errorCode');

const schema = Joi.object({
	id: Joi.string().required(),
});

module.exports = async (req, res) => {
	try {
		// To validate that the request body is valid
		const validateBody = schema.validate({ ...req.params }, { abortEarly: false });
		if (validateBody.error) {
			return res.status(400).json(validateBody.error.details)
		}

		logger.info(`${fileName} Trying to retrieve video ${req.params.id} details`);
		logger.info(`${fileName} Trying to perform an API call through AXIOS`);

		let userVideoDetails = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
			params: {
				key: process.env.YOUTUBE_API_KEY,
				id: req.params.id,
				part: 'snippet,contentDetails,statistics',
			}
		});

		logger.info(`${fileName} Success`);
		return res.status(200).json({
			status: 'success',
			data: userVideoDetails.data
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
