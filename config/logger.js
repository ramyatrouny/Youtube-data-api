const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'HH:mm:ss:ms' }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
        format.printf(warn => `${warn.level}: ${warn.message}`),
        format.printf(error => `${error.level}: ${error.message}`),
    ),
    transports: [
        new transports.Console(),
    ]
});

module.exports = logger;