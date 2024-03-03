const winston = require('winston');

const customLevelsOption = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
        http: 5,
    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'green',
        debug: 'blue',
        http: 'white',
    },
};
const logger = winston.createLogger({
    levels: customLevelsOption.levels,
    transports: [
        new winston.transports.Console({
            level: 'http',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOption.colors }),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.simple(),
        }),
    ],
});

const addLogger = (req, res, next) => {
    req.logger = logger;
    next();
};

module.exports = {
    logger,
    addLogger,
};
