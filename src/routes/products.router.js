// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

// Importaciones de modulos propios
const ProductManager = require('../managers/ProductManager.js');

//Creacion de array de productos
const productArray = new ProductManager();
//MIDDLE

// Configuración
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
router.post('/', async (req, res) => {
    // SETEO DE PRODUCTO
    const agrega = await productArray.addProduct({
        title: '¡Que producto!',
        description: 'Maravilloso',
        price: 500,
        thumbnail: 'sin imagen',
        code: tokenGenerator(10),
        stock: 10,
    });
    if (agrega === 'Producto agregado') {
        return res.status(200).res({ status: 'succes', payload: `Producto cargado` });
    } else {
        return res
            .status(200)
            .res({ status: 'error', payload: `El producto ${id} no se pudo actualizar, revise los datos.` });
    }
});

// HEHCHO Debe actualizar un producto segun el id
router.put('/:pid', async (req, res) => {
    // recupero de vari0ables dinamicas
    const id = req.params.pid;

    // Recupero de datos
    const productData = {};
    const actualiza = await updateProductById(id, productData);
    // Respuesta
    if (actualiza) {
        return res.status(200).res({ status: 'succes', payload: `El producto ${id} fue actualizado` });
    } else {
        returnres
            .status(200)
            .res({ status: 'error', payload: `El producto ${id} no se pudo actualizar, revise los datos.` });
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
