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
    try {
        const response = await mongoCartManager.getCartById(req.params.cid)
        console.log ("cartRoute Check", response, "6582efef5e2bfa870a2fb63e")
        return res.send(response)   
    } catch (error) {
        console.log (error)
        return res.send({status: "error", payload: error})
    }

});
// HECHO Actualizar un producto del carrito
router.post('/:cid/product/:pid', async (req, res) => { 
    const response = await mongoCartManager.addProductToCart(req.params.pid, req.params.cid)
    return res.send(response)
});

// Actualizar todo el carrito
router.post('/:cid/product/:pid', async (req, res) => {})
// Borrar un producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {})
// Borrar todos los productos el carrito
router.delete('/:cid', async (req, res) => {})

// exportación de rutas como modulo
module.exports = router;
