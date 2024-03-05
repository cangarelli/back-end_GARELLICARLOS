const productController = require('../../controller/products.controller.js');
const { generateProduct } = require('../../helpers/helpersBarrel.js');
const CustomRouter = require('../Routes.js');

const productManager = new productController();
class productClassRouter extends CustomRouter {
    init() {
        //seteo de rutas

        // RUTA DE MOKS
        this.get('/mockingproducts', ['public'], async (req, res) => {
            // DEBE ENTREGAR 100 productos usando mocks
            try {
                let products = [];
                for (let i = 0; i < 100; i++) {
                    products.push(generateProduct());
                }
                res.sendSuccess(products);
            } catch (error) {
                req.logger.Fatal(
                    'check error of productClassRouter class router is get method /mockingproducts',
                    error
                );
                return res.sendServerError(`${error}`);
            }
        });
        this.get('/', ['public'], async (req, res) => {
            try {
                let { category, disponibility, order, limit, onPage } = req.query;

                if (!limit) limit = 3;
                req.logger.Debug('check querys of productClassRouter is get method route / ', req.query, limit);
                const response = await productManager.getProducts({
                    category,
                    disponibility,
                    order,
                    limit,
                    onPage,
                });

                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of productClassRouter class router is get method', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.get('/daokeydata/:key', ['public'], async (req, res) => {
            try {
                const keyData = await productManager.getSelectiveData(req.params.key);
                return keyData.status == 'error' ? res.sendUserError(keyData) : res.sendSuccess(keyData);
            } catch (error) {
                req.logger.Fatal('check error of x class router is post method', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.get('/:pid', ['public'], async (req, res) => {
            try {
                req.logger.Info(
                    'check req.parms of of productClassRouter class router is get method /:pid',
                    req.params
                );
                const response = await productManager.getProduct(req.params.pid);
                req.logger.Info(
                    'check response of of productClassRouter class router is get method /:pid',
                    response
                );
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of productClassRouter class router is get method /:pid', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.post('/', ['admin'], async (req, res) => {
            try {
                const response = await productManager.createProduct(req.body);
                return response.status == 'error'
                    ? res.sendUserError(response.payload)
                    : res.sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of productClassRouter class router is post method', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.put('/:pid', ['admin'], async (req, res) => {
            try {
                const response = await productManager.updateProduct(req.params.pid, req.body);

                return response.status == 'error' ? sendUserError(response.payload) : sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of productClassRouter class router is put method', error);
                return res.sendServerError(`${error}`);
            }
        });
        this.delete('/:pid', ['admin'], async (req, res) => {
            try {
                const response = await productManager.deleteProduct(req.params.pid);

                return response.status == 'error' ? sendUserError(response.payload) : sendSuccess(response);
            } catch (error) {
                req.logger.Fatal('check error of productClassRouter class router is delete method', error);
                return res.sendServerError(`${error}`);
            }
        });
    }
}
module.exports = productClassRouter;
