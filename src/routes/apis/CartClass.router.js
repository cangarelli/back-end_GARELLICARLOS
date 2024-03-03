const CustomRouter = require('../Routes');
const cartController = require('../../controller/carts.controller');

const CartManager = new cartController();
class cartClassRouter extends CustomRouter {
    init() {
        //seteo de rutas

        this.post('/:cid/purchase', ['user'], async (req, res) => {
            // OK TODA LA RUTA Y SUS CAPAS
            try {
                const { email, cartId, full_name, id, role } = req.user;
                console.log('check req.user in post method of /:cid/purchase route ', req.user);
                const response = await CartManager.purchase({
                    purchaseList: req.body,
                    purchaser: email,
                    cid: cartId,
                });
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                console.log('check error of cart class router is post method /:cid/purchase', error);
                return res.sendServerError(`${error}`);
            }
        });

        this.get('/:cid', ['public'], async (req, res) => {
            // OK TODA LA RUTA Y SUS CAPAS
            try {
                const response = await CartManager.getOneCart(req.params.cid);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                console.log('check error of cart class router is get method /:cid', error);
                return res.sendServerError(error);
            }
        });
        this.post('/', ['public'], async (req, res) => {
            // OK TODA LA RUTA Y SUS CAPAS
            try {
                const response = await CartManager.createCart();
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                return res.sendServerError(response.payload);
            }
        });
        this.put('/:cid/product/:pid', ['user'], async (req, res) => {
            // OK TODA LA RUTA Y SUS CAPAS
            try {
                const { email, cartId, full_name, id, role } = req.user;

                const response = await CartManager.updateCart(req.params.pid, cartId, quantity);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
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
                return res.sendServerError(response.payload);
            }
        });
    }
}
module.exports = cartClassRouter;
