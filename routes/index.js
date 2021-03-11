// Controllers associated to user auth
const auth = {
	login: require('../controller/authentication/login'),
	signup: require('../controller/authentication/signup'),
	refreshToken: require('../controller/authentication/refreshToken'),
}
// Controllers associated to user details
const user = {
	self: require('../controller/user/self'),
	updateUser: require('../controller/user/updateUser'),
}
// Controllers associated to video
const video = {
	userVideos: require('../controller/videos/userVideos'),
	videoDetails: require('../controller/videos/videoDetails'),
}

module.exports = { auth, user, video };
