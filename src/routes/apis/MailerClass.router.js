const { sendMail } = require('../../helpers/helpersBarrel');
const CustomRouter = require('../Routes');

class mailerClassRouter extends CustomRouter {
    init() {
        //seteo de rutas
        this.get('/sendMail', ['user', 'admin', 'premium'], async (req, res) => {
            try {
                const { to, about, content } = req.body;
                const result = await sendMail({ destination: to, subject: about, html: content });

                if (result.status === 'error') {
                    res.sendUserError(error);
                } else {
                    res.sendSuccess(result);
                }
            } catch (error) {
                console.log('check error of mailerClassRouter class router is get method /sendMail', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.post('/ruta', async (req, res) => {
            try {
                if (condition) {
                    res.sendUserError(error);
                } else {
                    res.sendSuccess(dato);
                }
            } catch (error) {
                console.log('check error of x class router is post method', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.put('/ruta', async (req, res) => {
            try {
                if (condition) {
                    res.sendUserError(error);
                } else {
                    res.sendSuccess(dato);
                }
            } catch (error) {
                console.log('check error of x class router is put method', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.delete('/ruta', async (req, res) => {
            try {
                if (condition) {
                    res.sendUserError(error);
                } else {
                    res.sendSuccess(dato);
                }
            } catch (error) {
                console.log('check error of x class router is delete method', error);
                return res.sendServerError(`${error}`);
            }
        });
    }
}
module.exports = mailerClassRouter;
