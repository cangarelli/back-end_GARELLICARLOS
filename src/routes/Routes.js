const { Router } = require('express');
// Modulos para que interprete el body del request
const bodyParser = require('body-parser');

const { validateToken, json_private_key, CustomErrors, EErrors, logger } = require('../helpers/helpersBarrel.js');
const jwt = require('jsonwebtoken');

class CustomRouter {
    constructor() {
        this.routes = Router();
        this.init(); //Ejecuta automaticamente el metodo al instanciar la clase
    }
    getRouter() {
        this.routes.use(bodyParser.urlencoded({ extended: false }));
        this.routes.use(bodyParser.json());
        return this.routes;
    }

    init() {} // Metodo a completar en clase hija para agregar setear rutas.

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = (data) => res.send({ status: 'success', payload: data });
        res.sendServerError = (error) => res.status(500).send({ status: 'error', payload: error });
        res.sendUserError = (error) => res.status(400).send({ status: 'error', payload: error });
        res.sendTokenSucces = (data, cookieName, token) =>
            res
                .cookie(cookieName, token, { signed: true, maxAge: 60 * 60 * 1000, httpOnly: true })
                .send({ status: 'succes', payload: data, token });
        next();
    };
    // politics = ["public", "user", "user_premium", "admin"]
    handdlePolitics = (politics) => (req, res, next) => {
        if (politics[0] == 'public') return next();
        const authHeaders = req.headers.authorization;
        if (!authHeaders)
            return res.status(401).send({
                status: 'error',
                error: CustomErrors.createError({
                    name: 'Credentials error',
                    cause: 'Didn`t send credentials to authenticate',
                    message: 'Credentials error: Inexistent loguin',
                    code: EErrors.USER__NULL_CREDENTIALS__ERROR,
                }),
            });

        const token = authHeaders.split(' ')[1];

        let user = jwt.verify(token, json_private_key);

        if (!politics.includes(user.user.role))
            return res.status(400).send({
                status: 'error',
                error: CustomErrors.createError({
                    name: 'Credentials error',
                    cause: 'No authorized',
                    message: 'Don`t have permision to access to this data',
                    code: EErrors.USER__NULL_CREDENTIALS__ERROR,
                }),
            });
        req.user = user.user;
        next();
    };

    // Metodo para ejecutar nuestros callbacks [middleware, (req, res) => {}]
    applyCallBacks(callbacksarray) {
        return callbacksarray.map((callback) => async (...params) => {
            try {
                await callback.apply(this, params);
            } catch (error) {
                logger.Fatal(error);
                params[1].status(500).send(error);
            }
        });
    }
    get(path, politics, ...callbacks) {
        this.routes.get(
            path,
            this.handdlePolitics(politics),
            this.generateCustomResponses,
            this.applyCallBacks(callbacks)
        );
    }
    post(path, politics, ...callbacks) {
        this.routes.post(
            path,
            this.handdlePolitics(politics),
            this.generateCustomResponses,
            this.applyCallBacks(callbacks)
        );
    }
    put(path, politics, ...callbacks) {
        this.routes.put(
            path,
            this.handdlePolitics(politics),
            this.generateCustomResponses,
            this.applyCallBacks(callbacks)
        );
    }
    delete(path, politics, ...callbacks) {
        this.routes.delete(
            path,
            this.handdlePolitics(politics),
            this.generateCustomResponses,
            this.applyCallBacks(callbacks)
        );
    }
}
module.exports = CustomRouter;
