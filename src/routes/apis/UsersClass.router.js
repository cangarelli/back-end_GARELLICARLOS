const CustomRouter = require('../Routes.js');

// Creación de instancias de managers
const userController = require('../../controller/users.controller.js');
const cartController = require('../../controller/carts.controller.js');
const userManager = new userController();
const cartManager = new cartController();

class userClassRouter extends CustomRouter {
    init() {
        //seteo de rutas
        // Cambio de rol de user a premium y viceversa
        this.post('/premium/:uid', ['user', 'premium'], async (req, res) => {
            try {
                req.logger.Debug(
                    'check req.user in user class router is post /premium/:uid ruoute',
                    req.user
                );
                const result = await userManager.changeUserRole(req.user.email, req.user.role);
                return result.status == 'error' ? res.sendUserError(result.payload) : res.sendSuccess(result);
            } catch (error) {
                req.logger.Fatal('check error of user class router is post /premium/:uid route', error);
                return res.sendServerError(`${error}`);
            }
        });
        //Enviar mail con link para recupero de clave
        this.post('/temporalRetrieveAtempt/sendLinkMail', ['public'], async (req, res) => {
            try {
                const result = await userManager.sendMailLink(req.body.email);
                return result.status == 'error' ? res.sendUserError(result.payload) : res.sendSuccess(result);
            } catch (error) {
                req.logger.Fatal(
                    'check error of user class router is post /temporalRetrieveAtempt/sendLinkMail route',
                    error
                );
                return res.sendServerError(`${error}`);
            }
        });
        // Actualizar contraseña en recupero de clave
        this.post('/temporalRetrieveAtempt/uptdatePassword/:token', ['public'], async (req, res) => {
            try {
                const result = await userManager.retrieveUpdatePass(req.body.password, req.params.token);
                req.logger.Debug('check result of user Class Rotuer is get route', result);
                return result.status == 'error' ? res.sendUserError(result.payload) : res.sendSuccess(result);
            } catch (error) {
                req.logger.Fatal('check get error of user class router is post method user', error);
                return res.sendServerError(`${error}`);
            }
        });

                //GET USERes
                this.get('/:uid', ['public'], async (req, res) => {
try {
    const result = await userManager.getUser(undefined);
    req.logger.Debug('check result of user Class Rotuer is get users route', result);
    return result.status == 'error' ? res.sendUserError(result.payload) : res.sendSuccess(result);
} catch (error) {
    req.logger.Fatal('check error of user class router is get users method user', error);
    return res.sendServerError(`${error}`);
}
                })
        //GET USER
        
        this.get('/:uid', ['public'], async (req, res) => {
            // OK TODA LA RUTA Y SUS CAPAS
            try {
                if (uid) {
                    const result = await userManager.getUser(req.params.uid);
                    req.logger.Debug('check result of user Class Rotuer is get route', result);
                    return result.status == 'error' ? res.sendUserError(result.payload) : res.sendSuccess(result);
                } else {
                    return res.sendUserError("Dont sent user id data")
                }

            } catch (error) {
                req.logger.Fatal('check error of user class router is get user method user', error);
                return res.sendServerError(`${error}`);
            }
        });


        // OK TODA LA RUTA Y SUS CAPAS
        this.post('/', ["public"], async (req, res) => {
            try {
                const response = await userManager.createUser(req.body);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of user class router is post method /', error);
                cartManager.cleanCartsWhitOutUser();
                return res.sendServerError(`${error}`);
            }
        });
        this.put('/:uid', ['user', 'admin', "premium"], async (req, res) => {
            try {
                const response = await userManager.updateUser(req.params.uid, req.body);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response.payload);
            } catch (error) {
                req.logger.Fatal('check error of user class router is put method', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.delete('/:uid', ['user', 'admin', "premium"], async (req, res) => {
            try {
                const response = await userManager.deleteUser(req.params.uid);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of user class router is delete method', error);
                return res.sendServerError(`${error}`);
            }
        });
    }
}
module.exports = userClassRouter;
