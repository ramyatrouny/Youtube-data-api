/**
 * @apiDefine updateUserInput
 * @apiParam {string} email                 user email address
 * @apiParam {string} password              user password
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

module.exports = (req, res) => {

}