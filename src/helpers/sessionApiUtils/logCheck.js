const configObjetc = require('../../config/configObjetc');

const jwt = require('jsonwebtoken');
const { logger } = require('../helpersBarrel');

const logCheck = () => {
    return async (req, res, next) => {
        try {
            if (!req.session) {
                return res.status(401).send({ status: 'error', error: 'not loged' });
            } else {
                const session = req.session.token;
                jwt.verify(session, configObjetc.jwt_secret_key, (err, userDecode) => {
                    if (err) return req.user = {status: "error", payload: "not logued"};
                    req.user = userDecode.user;
                });
                next();
            }
        } catch (error) {
            logger.Fatal('middleware error', error);
        }
    };
};

module.exports = logCheck;
