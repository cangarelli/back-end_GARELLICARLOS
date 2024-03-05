const winston = require('winston');
const { configObject } = require('../../config/configBarrel.js');

const customLevelsOption = {
    levels: {
        Fatal: 0,
        Error: 1,
        Warning: 2,
        Info: 3,
        Debug: 4,
        Http: 5,
    },
    colors: {
        Fatal: 'red',
        Error: 'orange',
        Warning: 'yellow',
        Info: 'green',
        Debug: 'blue',
        Http: 'white',
    },
};
if (configObject.logger === 'dev') {
}
const logger = winston.createLogger({
    levels: customLevelsOption.levels,
    transports: [
        new winston.transports.Console({
            level: configObject.logger === 'dev' ? 'Http' : 'Info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelsOption.colors }),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: configObject.logger === 'dev' ? 'Warning' : 'Fatal',
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
