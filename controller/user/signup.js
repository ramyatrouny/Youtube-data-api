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
 * @apiGroup Everyone
 * @apiPermission isPublic
 */

module.exports = (req, res) => {

}