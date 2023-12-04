// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
// Modulos para que interprete el body del request
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Importaciones de modulos propios
const ProductManager = require('../../managers/ProductManager.js');
const { uploader } = require('../../helpers/uploader.js');


//Creacion de array de productos
const productArray = new ProductManager();

// Configuración de rutas
router.get('/', async (req, res) => {
    // recupero de variables dinamicas
    const limit = req.query.limit;
    // Recupero de datos
    let listObjetcs = await productArray.getProducts();

    // Lógica
    limit != undefined
        ? (listObjetcs = listObjetcs.slice(0, limit))
        : console.log('La lista de productos va completa');

    // Envio de datos
    if (listObjetcs.length > 0) {
        return res.status(200).send({ status: 'succes', payload: listObjetcs });
    } else {
        console.log('No hay productos registrados');
        return res.status(200).send({ status: 'error', mesagge: 'No hay productos registrados' });
    }
});
router.get('/:pid', async (req, res) => {
    // recupero de vari0ables dinamicas
    const id = req.params.pid;

    // Recupero de datos
    const busqueda = await productArray.getProductById(id);

    // Envio de datos
    if (busqueda == 'Not found') {
        return res.status(200).send({ error: 'El producto solicitado no existe' });
    } else {
        return res.status(200).send({ status: 'succes', payload: busqueda });
    }
});

//HECHO Debe agregar un nuevo producto
router.post('/' ,async (req, res) => {
    /* Proximamente Multer
    //datos del body.
    const postData = req.body

    // Utiliza el middleware de Multer 
    await uploader.single('image')(req, res, async (err) => {
        if (err) {
            console.error('Error al cargar el archivo:', err);
            return;
        }
    });
    // Agrega la ruta del archivo junto con el nombre al objeto info
    const filePath = `${req.file.path}/${req.file.filename}`;
    */
    
    // SETEO DE PRODUCTO
    const agrega = await productArray.addProduct(req.body);
    // Respuesta de servidor
    if (agrega) {
        return res.status(200).send({ status: 'succes', payload: `Producto cargado` });
    } else {
        return res
            .status(200)
            .send({ status: 'error', payload: `El producto no se pudo cargar, revise los datos.` });
    }
});

// HEHCHO Debe actualizar un producto segun el id
router.put('/:pid', async (req, res) => {
    // Operaciones con base de datos
    const productData = req.body
    const actualiza = await productArray.updateProductById(req.params.pid, productData);

    // Respuesta
    if (actualiza) {
        return res
            .status(200)
            .send({ status: 'succes', payload: `El producto ${req.params.pid} fue actualizado` });
    } else {
        return res.status(200).send({
            status: 'error',
            payload: `El producto ${req.params.pid} no se pudo actualizar, revise los datos.`,
        });
    }
});
// HECHO Toma un producto por id y lo elimina del array y la db
router.delete('/:pid', async (req, res) => {
    // Llamado al método y realización de actividad.
    const borra = await productArray.deletProductById(req.params.pid);

    // Respuesta
    borra === true
        ? res.status(200).send({ status: 'succes', payload: 'Producto eliminado de la lista de productos' })
        : res
              .status(200)
              .send({ status: 'error', payload: 'No se encuentra el producto que desea eliminar' });
});

// exportación de rutas como modulo
module.exports = router;
