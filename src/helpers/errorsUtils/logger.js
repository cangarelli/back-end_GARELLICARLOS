const winston = require ("winston")

const customLevelsOption = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
        http: 5
    },
    colors:{
        fatal: "red",
        error: "yellow",
        warning: "yellow" ,
        info: "blue",
        http: "white"
    }
}
const logger = winston.createLogger({
    levels: customLevelsOption.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            // format: winston.format.
        })
    ]
})


const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http
}

module.exports = {
    logger,
    addLogger
}