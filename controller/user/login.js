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
 * @apiGroup Everyone
 * @apiPermission isPublic
 */

module.exports = (req, res) => {

}