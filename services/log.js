const { createLogger, format, transports } = require("winston");
const logger = createLogger({
    // change level if in dev environment versus production
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new transports.File({ filename: "./logs/app.log" })],
});

module.exports = logger;
