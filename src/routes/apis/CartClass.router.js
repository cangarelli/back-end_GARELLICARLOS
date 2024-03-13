const CustomRouter = require('../Routes');
const cartController = require('../../controller/carts.controller');

const CartManager = new cartController();
class cartClassRouter extends CustomRouter {
    init() {
        //seteo de rutas
        //Generar ticket y actualización de stocks
        this.post('/:cid/purchase', ['user'], async (req, res) => {
            // OK TODA LA RUTA Y SUS CAPAS
            try {
                const { email, cartId, full_name, id, role } = req.user;
                req.logger.Info('check req.user in post method of /:cid/purchase route ', req.user);
                const response = await CartManager.purchase({
                    purchaseList: req.body,
                    purchaser: email,
                    cid: cartId,
                });
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of cart class router is post method /:cid/purchase', error);
                return res.sendServerError(`${error}`);
            }
        });
        // Averiguar cantidad de productos en carrito por id
        this.get('/cartHold/:cid', ['user', 'admin'], async (req, res) => {
            // retornar la cantidad de productos que hay en el carrito
            try {
                const response = await CartManager.getQuantity(req.params.cidf);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of cart class router is get method /cartHold/:cid', error);
                return res.sendServerError(`${error}`);
            }
        });
        //Buscar carrito por id
        this.get('/:cid', ['public'], async (req, res) => {
            try {
                const response = await CartManager.getOneCart(req.params.cid);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of cart class router is get method /:cid', error);
                return res.sendServerError(error);
            }
        });
        // Crear carrito
        this.post('/', ['public'], async (req, res) => {
            // OK TODA LA RUTA Y SUS CAPAS
            try {
                const response = await CartManager.createCart();
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of cart class router is post method /', error);
                return res.sendServerError(response.payload);
            }
        });
        //Agregar / Quitar producto del carrito
        this.put('/:cid/product/:pid', ['user'], async (req, res) => {
            // OK TODA LA RUTA Y SUS CAPAS
            try {
                const { email, cartId, full_name, id, role } = req.user;
                const {quantity} = req.body
                quantity || 1
                const response = await CartManager.updateCart(req.params.pid, cartId, quantity);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of cart class router is put method /:cid/product/:pid', error);
                return res.sendServerError(response.payload);
            }
        });

        this.put('/:cid', ['user'], async (req, res) => {
            const { email, cartId, full_name, id, role } = req.user;
        });
        this.delete('/:cid/product/:pid', ['user'], async (req, res) => {
            try {
                const { email, cartId, full_name, id, role } = req.user;
                const response = await CartManager.deleteOneProduct(req.params.pid, cartId);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal(
                    'check error of cart class router is delete method /:cid/product/:pid',
                    error
                );
                return res.sendServerError(response.payload);
            }
        });
        this.delete('/:cid', async (req, res) => {
            try {
                const response = await CartManager.deleteCart(req.params.cid);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of cart class router is delete method /:cid', error);
                return res.sendServerError(response.payload);
            }
        });
    }
}
module.exports = cartClassRouter;
