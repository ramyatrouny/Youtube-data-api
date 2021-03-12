const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,
    },
    full_name: {
        type: String,
        require: true,
    },
    youtube_channel_id: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userModel);