const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const errorCode = require('../util/errorCode');

const fileName = __filename.split(/(\\|\/)/g).pop();

module.exports = async (req, res, next) => {
	logger.info(`${fileName} Trying to retrieve the authorization token`);
	let token = req.headers['authorization'];

	if (!token) {
		logger.warn(`${fileName} request has no token`);
		return res.status(401).json({
			status: 'error',
			data: {
				code: errorCode.unauthenticated,
				message: 'User unauthenticated'
			}
		})
	}

	logger.info(`${fileName} Trying to check if the header token is a Bearer`);
	if (!token.startsWith('Bearer')) {
		logger.warn(`${fileName} The header token is not a bearer`);
		return res.status(401).json({
			status: 'error',
			data: {
				code: errorCode.unauthenticated,
				message: 'User unauthenticated'
			}
		})
	}

	logger.info(`${fileName} Trying to parse the JWT token`)
	token = token.slice(7, token.length).trimLeft();

	try {
		logger.info(`${fileName} Trying to verify the JWT token`);
		// Note: jwt.verify is synchronous
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);

		logger.info(`${fileName} Decoded Token ${JSON.stringify(decoded)}`);
		req.user = decoded.id

		next();

	} catch (error) {
		logger.warn(`${fileName}: Unauthorized, Unable to verify the token`);
		return res.status(401).json({
			status: 'error',
			data: {
				code: errorCode.unauthenticated,
				description: ' User Unauthenticated'
			}
		})
	}
}