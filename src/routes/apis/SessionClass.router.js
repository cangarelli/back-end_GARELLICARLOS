const CustomRouter = require('../Routes.js');

const passport = require('passport');
const { createToken, validateToken } = require('../../helpers/sessionApiUtils/jwt.js');
const {
    authorizationJWT,
    passportCall,
    logCheck,
    tokenLinkValidator,
} = require('../../helpers/helpersBarrel.js');
const userController = require('../../controller/users.controller.js');

// Creación de instancias de managers
const userManager = new userController();

const nameCookie = 'token';
class SessionClassRouter extends CustomRouter {
    init() {
        //seteo de rutas

        // Validación de link por medio de token
        this.get('/tokenLinkValidator/:token', ['public'], tokenLinkValidator(), async (req, res) => {
            try {
                req.middleware.status == 'error'
                    ? res.sendUserError(req.middleware.payload)
                    : res.sendSuccess(req.middleware.payload);
            } catch (error) {
                req.logger.Fatal(
                    'check error of SessionClassRouter is get method of /loguinValidator route',
                    error
                );
                return res.sendServerError(`${error}`);
            }
        });
        // Validación de loguin por token
        this.get('/loguinValidator', ['public'], logCheck(), async (req, res) => {
            try {
                req.logger.Debug('check req.user in login validator', req.user);
                req.user.status == 'error'
                    ? res.sendUserError(req.user.payload)
                    : res.sendTokenSucces(req.user, nameCookie, req.session.token);
            } catch (error) {
                req.logger.Fatal(
                    'check error of SessionClassRouter is get method of /loguinValidator route',
                    error
                );
                return res.sendServerError(`${error}`);
            }
        });
        // Creación de loguin
        this.post('/loguin', ['public'], async (req, res) => {
            try {
                req.logger.Debug(
                    'check req.body of SessionClassRouter is get method of /loguin route',
                    req.body
                );
                const response = await userManager.userCheck(req.body.email, req.body.password);
                if (response.status == 'error') {
                    return res.sendUserError(response.payload);
                } else {
                    const token = createToken(response);
                    req.session.token = token;
                    return res.sendTokenSucces(response, nameCookie, token);
                }
            } catch (error) {
                req.logger.Fatal('check error of SessionClassRouter is get method of /loguin route', error);
                return res.sendServerError(`${error}`);
            }
        });
        // Registro de usuario nuevo
        this.post('/register', async (req, res) => {
            try {
                const response = await userManager.createUser(req.body);

                if (response.status == 'error') {
                    return res.sendUserError(response.payload);
                } else {
                    return res.sendSuccess(response);
                }
            } catch (error) {
                req.logger.Fatal('check error of session router is post method /register', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.get('/current', ['public'], passportCall('jwt'), authorizationJWT('admin'), async (req, res) => {
            try {
                res.send({ message: 'datos sencibles', user: req.user });
            } catch (error) {
                req.logger.Fatal('check error of Session Class Router  is get method /current', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.delete('/logout', ['user', 'admin', 'premium'], async (req, res) => {
            try {
                res.clearCookie(nameCookie);
                if (req && req.session) {
                    req.session.destroy((err) => {
                        if (err) {
                            res.sendUserError(err);
                        } else {
                            res.sendSuccess('logout exitoso');
                        }
                    });
                }
            } catch (error) {
                req.logger.Fatal('check error of session class router is delete method /logout', error);
                return res.sendServerError(`${error}`);
            }
        });
    }
}
module.exports = SessionClassRouter;
