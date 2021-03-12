/**
 * @api { get } /api/videos Get the user videos
 * @apiName userVideos
 * @apiDescription get the user videos
 * @apiGroup Video
 * @apiPermission isAuthenticated
 */

const fileName = __filename.split(/(\\|\/)/g).pop();
const logger = require('../../config/logger');
const axios = require('axios');

const UserModel = require('../../model/UserModel');
const errorCode = require('../../util/errorCode');

module.exports = async (req, res) => {
    try {
        logger.info(`${fileName} Trying to retrieve the logged in user youtube Channel ID`);
        const { youtube_channel_id } = await UserModel.findById(req.user).select('-_id youtube_channel_id');

        logger.info(`${fileName} Trying to retrieve the current user ${req.user} videos from youtube API`);
        logger.info(`${fileName} Trying to perform an API call through AXIOS`);

        let userVideos = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                key: process.env.YOUTUBE_API_KEY,
                type: 'video',
                part: 'snippet',
                order: 'date',
                channelId: youtube_channel_id
            }
        });

        logger.info(`${fileName} Trying to cleanup the retrieved data from youtube`)
        let youtubeVideoCleanup = youtubeVideoDataCleanup(userVideos.data);

        logger.info(`${fileName} Success`);
        return res.status(200).json({
            status: 'success',
            data: youtubeVideoCleanup
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

/**
 * @description The following function is made to cleanup youtube API form useless data and return only what's important
 * @param {Object[]} youtubeRes Response retrieved from youtube API
 */
const youtubeVideoDataCleanup = (youtubeRes) => {
    let youtubeData = [];

    youtubeRes.items.map(video => {
        let obj = {
            videoId: video.id.videoId,
            publishedAt: video.snippet.publishedAt,
            title: video.snippet.title,
            channel_title: video.snippet.channelTitle,
            publishTime: video.snippet.publishTime
        }

        youtubeData.push(obj);
    });

    return youtubeData;
}