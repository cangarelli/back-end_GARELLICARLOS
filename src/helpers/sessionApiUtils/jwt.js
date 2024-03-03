const jwt = require('jsonwebtoken');
const json_private_key = 'laClaveQueMásMeGustaAMi';

const createToken = (user) => jwt.sign({ user }, json_private_key, { expiresIn: '1d' });

const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('validateToken');
    if (!authHeader) {
        res.status(401).send({ status: 'error', error: 'not authenticated' });
    } else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, json_private_key, (err, userDecode) => {
            if (err) return res.status(401).send({ status: 'error', error: 'not authorized' });
            console.log('check userDecode in validateToken helper', userDecode);
            req.user = userDecode;
        });
        next();
    }
};

module.exports = {
    createToken,
    validateToken,
    json_private_key,
};
