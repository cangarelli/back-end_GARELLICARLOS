const jwt = require('jsonwebtoken');
const configObject = require('../../config/configObjetc');

const tokenLinkValidator = () => {
    return (req, res, next) => {
        jwt.verify(req.params.token, configObject.jwt_secret_key, (err, userDecode) => {
            if (err) {
                req.middleware = { status: 'error', payload: 'Link invalid' };
            } else {
                req.middleware = { status: 'success', payload: 'Link valid' };
            }
        });
        next();
    };
};

module.exports = tokenLinkValidator;
