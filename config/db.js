const mongoose = require('mongoose');
const logger = require('../config/logger');

module.exports = async () => {
    try {
        logger.info(`Trying to connect to Mongodb`);

        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        logger.info(`MongoDB connected: ${connection.connection.host}`);

    } catch (error) {
        logger.error(`Unable to connect to MongoDB`);
        logger.error(`Error: ${process.env.message}`);
        process.exit(1);
    }
}