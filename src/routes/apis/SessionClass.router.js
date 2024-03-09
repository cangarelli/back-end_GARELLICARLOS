const CustomRouter = require('../Routes.js');

const passport = require('passport');
const { createToken } = require('../../helpers/sessionApiUtils/jwt.js');
const { authorizationJWT, passportCall } = require('../../helpers/helpersBarrel.js');
const userController = require('../../controller/users.controller.js');

// Creación de instancias de managers
const userManager = new userController();

const nameCookie = 'token';
class SessionClassRouter extends CustomRouter {
    init() {
        //seteo de rutas
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
