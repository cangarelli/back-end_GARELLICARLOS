// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
/* Hay clases nuevas que tienen muchos metodos estaticos y no necesitan empezar con el new */
const fs = require('fs');

// Importaciones de modulos propios
const CartManager = require('../../dao/managers/CartManager.js');
const ProductManager = require('../../dao/managers/ProductManager.js');
const CartMongoManager = require ("../../dao/managersMongo/CartMongoManager.js")

//Variables globales
const productManager = new ProductManager();
const carts = new CartManager();
const mongoCartManager = new CartMongoManager();
// SETEO DE RUTAS
// HECHO Debe crear un nuevo carrito -- ver metodo
router.post('/', async (req, res) => {
    const response = await mongoCartManager.createCart()
    return res.send(response)
});
//HECHO Listar los productos que aparezcan en el carrito con el cid de params
router.get('/:cid', async (req, res) => {
    const response = await mongoCartManager.getCartById(req.params.cid)
    return res.send(response)
});
// HECHO Agregar productos al arreglo producs del carrito agregandose como un objeto. Product id y quantity
router.post('/:cid/product/:pid', async (req, res) => { 
    const response = await mongoCartManager.addProductToCart(req.params.pid, req.params.cid)
    return res.send(response)
});

// exportación de rutas como modulo
module.exports = router;
