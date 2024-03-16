// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

// Modulos para que interprete el body del request
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Importaciones de modulos propios
const { uploader } = require('../../helpers/fileManagers/uploader.js');
const { paginateSubDocs } = require('mongoose-paginate-v2');
const productController = require('../../controller/products.controller.js');

const productManager = new productController();

// Configuración de rutas
// DATA MANAGERS MONGOOSE

router.get('/', async (req, res) => {
    try {
        let { category, disponibility, order, limit, onPage } = req.query;
        const response = await productManager.getProducts({ category, disponibility, order, limit, onPage });
        return response.status == 'error'
            ? res.status(400).send({ status: 'error', payload: response.payload })
            : res.send({ status: 'succes', payload: response.payload });
    } catch (error) {
        return res.status(500).send({ status: 'error', payload: error });
    }
});

router.get('/daokeydata/:key', async (req, res) => {
    try {
        const keyData = await productManager.getSelectiveData(req.params.key);
        return keyData.status == 'error'
            ? res.status(400).send({ status: 'error', payload: keyData })
            : res.send({ status: 'succes', payload: keyData });
    } catch (error) {
        return res.status(500).send({ status: 'error', payload: error });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const response = await productManager.getProduct(req.parms.pid);
        return response.status == 'error'
            ? res.status(400).send({ status: 'error', payload: response.payload })
            : res.send({ status: 'succes', payload: response.payload });
    } catch (error) {
        return res.status(500).send({ status: 'error', payload: error });
    }
});

router.post('/', async (req, res) => {
    try {
        const response = await productManager.createProduct(req.body);
        return response.status == 'error'
            ? res.status(400).send({ status: 'error', payload: response.payload })
            : res.send({ status: 'succes', payload: response.payload });
    } catch (error) {
        return res.status(500).send({ status: 'error', payload: error });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const response = await productManager.updateProduct(req.params.pid, req.body);
        return response.status == 'error'
            ? res.status(400).send({ status: 'error', payload: response.payload })
            : res.send({ status: 'succes', payload: response.payload });
    } catch (error) {
        return res.status(500).send({ status: 'error', payload: error });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const response = await productManager.deleteProduct(req.params.pid);

        return response.status == 'error'
            ? res.status(400).send({ status: 'error', payload: response.payload })
            : res.send({ status: 'succes', payload: response.payload });
    } catch (error) {
        return res.status(500).send({ status: 'error', payload: error });
    }
});

// exportación de rutas como modulo
module.exports = router;

/* CARGADO DE FILE DB EN MONGO DB
router.post ("/armado", async (req, res) => {
    let listObjetcs = await productArray.getProducts();
    listObjetcs.forEach(async (product) => {
        delete product.id
        console.log (product)
        const result = await productsModel.create(product)  
    })
    console.log ("datos cargados?")

    return res.status(200).send({ status: 'succes', payload: listObjetcs });
})*/
