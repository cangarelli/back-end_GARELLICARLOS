// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
/* Hay clases nuevas que tienen muchos metodos estaticos y no necesitan empezar con el new */
const fs = require('fs');

// Importaciones de modulos propios
const CartManager = require('../../dao/managers/CartManager.js');
const ProductManager = require('../../dao/managers/ProductManager.js');
const { cartsModel } = require ("../../dao/models/carts.model.js")
const { productsModel } = require ("../../dao/models/products.model.js")

//Variables globales
const productManager = new ProductManager();
const carts = new CartManager();

// SETEO DE RUTAS
// HECHO Debe crear un nuevo carrito -- ver metodo
router.post('/', async (req, res) => {
    try {
        // Creación de cart con fileSystem
        const crea = await carts.createCart();
        // Creación de cart con Mongoose
        const newCart = await cartsModel.create({})
        // Respuesta del servidor
        return res.status(200).send({ status: 'succes', payload: newCart });
    } catch (error) {
        console.log (error)
        return res.status(200).send({ status: 'error', payload: 'carrito no creado' });
    }
});
//HECHO Listar los productos que aparezcan en el carrito con el cid de params
router.get('/:cid', async (req, res) => {
    const id = req.params.cid
    try {
        const virtualCart = await carts.getProductsByCartId(id);
        const cart = await cartsModel.findById(id)
        console.log (cart)
        return res.status(200).send({ status: 'succes', payload: cart });
    } catch (error) {
        console.log (error)
        return res.status(200).send({ status: 'error', mesagge: 'El caarrito solicitado no existe' });
    }
});
// HECHO Agregar productos al arreglo producs del carrito agregandose como un objeto. Product id y quantity
router.post('/:cid/product/:pid', async (req, res) => { 
    const { cid, pid } = req.params;
    console.log (cid, pid)
    try {
        // Mongoose - chequeo de pid en array de productos
        const hay = await productsModel.findById(pid)
        const virtualCart = await cartsModel.findById(cid)
        // FileSystem - chequeo de pid
        // const exist = await productManager.getProductById(pid);
        if (hay.stock > 0) {
            // Filesystem - Carga de producto a la lista del carrito
            // const quepaso = await carts.addProductById(cid, pid);
            // Chequea si hay de ese producto en el carrito
            let existingProduct = -1
            const {products} = virtualCart
            products.length > 0 && (() =>  {
                existingProduct = products.findIndex(product => product.prodId === pid)
            })(); 
            if (existingProduct != -1) {
                const newQuantity = products[existingProduct].quantity += 1
                const result = await cartsModel.updateOne(
                    { _id: cid, "products.prodId": pid },
                    { $set: { "products.$.quantity": newQuantity } })
                return res.send({ status: 'succes', payload: result });
            } else {
                try {
                    products.push({prodId: pid, quantity: 1})
                    const result = await cartsModel.findOneAndUpdate(
                        { _id: cid},
                        {products},
                        )
                    return res.send({ status: 'succes', payload: result });                    
                } catch (error) {
                    console.log (error)
                }
            }
        } else {
            return res.send({ status: 'error', payload: `el producto ${pid} no existe en la base de datos` });
        }
    } catch (error) {
        console.log (error)
        return res.send({ status: 'error', payload: error });
    }
});

// exportación de rutas como modulo
module.exports = router;
