// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
/* Hay clases nuevas que tienen muchos metodos estaticos y no necesitan empezar con el new */
const fs = require('fs');

// Importaciones de modulos propios
const CartManager = require('../../dao/managers/CartManager.js');
const ProductManager = require('../../dao/managers/ProductManager.js');

//Variables globales
const productManager = new ProductManager();
const carts = new CartManager();

// SETEO DE RUTAS
// HECHO Debe crear un nuevo carrito -- ver metodo
router.post('/', async (req, res) => {
    const crea = await carts.createCart();
    if (crea) {
        return res.status(200).send({ status: 'succes', payload: 'Carrito creado' });
    } else {
        return res.status(200).send({ status: 'error', payload: 'carrito no creado' });
    }
});
//HECHO Listar los productos que aparezcan en el carrito con el cid de params
router.get('/:cid', async (req, res) => {
    const virtualCart = await carts.getProductsByCartId(req.params.cid);

    if (virtualCart == 'Not found') {
        return res.status(200).send({ status: 'error', mesagge: 'El caarrito solicitado no existe' });
    } else {
        return res.status(200).send({ status: 'succes', payload: virtualCart });
    }
});
// HECHO Agregar productos al arreglo producs del carrito agregandose como un objeto. Product id y quantity
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const exist = await productManager.getProductById(pid);
    if (exist != 'Not found') {
        const quepaso = await carts.addProductById(cid, pid);
        if (quepaso) {
            return res
                .status(200)
                .send({ status: 'succes', payload: `El producto ${pid} agregado al carrito ${cid}` });
        } else {
            return res
                .status(200)
                .send({ status: 'error', mesagge: `El carrito ${cid} solicitado no existe` });
        }
    } else {
        return res
            .status(200)
            .send({ status: 'error', payload: `El producto ${pid} no se encuentra en el catalogo` });
    }
});

// exportación de rutas como modulo
module.exports = router;
