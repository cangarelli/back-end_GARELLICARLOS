const UserMongoManager = require('../dao/managersMongo/UserMongoManager.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { createToken, validateToken } = require('../helpers/jwt.js');
const { passportCall } = require('../helpers/passportCall.js');
const { authorizationJWT } = require('../helpers/middleware/jwt-passport.middleware.js');
const { logger } = require('../helpers/helpersBarrel.js');
const { jwt_secret_key } = require('../config/configObjetc.js');

class sessionController {
    constructor() {
        this.service = new UserMongoManager();
    }
    register = async () => {
        try {
            logger.Debug('check result del middlework de register route', req.user);
            if (typeof req.user == 'object') {
                const { newUser } = req.user;
                const token = createToken({ id: newUser._id, role: newUser.role, cartId: newUser.cartId });
                return res.send({ status: 'succes', payload: newUser, token });
            } else {
                return res.send({ status: 'error', payload: req.user });
            }
        } catch (error) {
            logger.Fatal('Crear usuario', error);
        }
    };
    loguin = async () => {
        try {
            const result = await userManager.userCheck({
                userMail: req.params.email,
                userPassword: req.params.pass,
            });
            if (typeof result == 'object') {
                req.session.Userdata = result;
                logger.Debug('check result loguin route', result);
                const token = createToken({ id: result.userId, role: result.role, cartId: result.cartId });
                return res
                    .cookie('token', token, {
                        maxAge: 60 * 60 * 1000,
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
                    })
                    .send({ status: 'succes', payload: result });
            } else {
                return res.status(401).send({ status: 'error', payload: result });
            }
        } catch (error) {
            logger.Fatal('check result loguin route catch', error);
            return res.status(500).send({ status: 'server error', payload: error });
        }
    };
    logout = async () => {};
    valitor = async (req, res, next) => {};
}

module.exports = sessionController;
