const jwt = require('jsonwebtoken');
const { logger } = require('../errorsUtils/logger.js');
const { jwt_secret_key } = require('../../config/configObjetc.js');

const createToken = (user) => jwt.sign({ user }, jwt_secret_key, { expiresIn: '1d' });

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    logger.Debug('validateToken');
    if (!authHeader) {
        res.status(401).send({ status: 'error', error: 'not authenticated' });
    } else {
        const token = authHeader.split(' ')[1];
        jso;
        jwt.verify(token, jwt_secret_key, (err, userDecode) => {
            if (err) return res.status(401).send({ status: 'error', error: 'not authorized' });
            logger.Debug('check userDecode in validateToken helper', userDecode);
            req.user = userDecode;
        });
        next();
    }
};

module.exports = {
    createToken,
    validateToken,
};
