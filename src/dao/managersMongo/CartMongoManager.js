// Modulos importados
const { cartsModel } = require ("../models/carts.model.js")
const { productsModel } = require ("../models/products.model.js")

// CLASE CONSTRUCTORA
class CartMongoManager {
    constructor() {}
    async createCart (){
        try {
            // Creación de cart con Mongoose
            const newCart = await cartsModel.create({})
            // Respuesta
            return ({ status: 'succes', payload: newCart });
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: 'cart not created' });
        }
    }
    async gecCartById (cid) {
        try {
            const cart = await cartsModel.findById(cid)
            console.log (cart)
            return ({ status: 'succes', payload: cart });
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: 'The cart choose dosent exist' });
        }
    }
    async addProductToCart (pid, cid){
        try { // Falta quitar del stock del array de productos cuando suma.
            // Carga de datos
            const hay = await productsModel.findById(pid)
            const virtualCart = await cartsModel.findById(cid)
            // Chequeo si hay stock del producto.
            if (hay.stock > 0) {
                // Si hay stock me fijo si ya hay de ese producto en el carrito
                let existingProduct = -1
                const {products} = virtualCart
                products.length > 0 && (() =>  {
                    existingProduct = products.findIndex(product => product.prodId === pid)
                })(); 
                // Si ya hay en el carrito agrego 1 al paquete
                if (existingProduct != -1) {
                    const newQuantity = products[existingProduct].quantity += 1
                    const result = await cartsModel.updateOne(
                        { _id: cid, "products.prodId": pid },
                        { $set: { "products.$.quantity": newQuantity } })
                    return res.send({ status: 'succes', payload: result });
                // Si no hay agrego uno creando el paquete
                } else {
                    try {
                        products.push({prodId: pid, quantity: 1})
                        const result = await cartsModel.findOneAndUpdate(
                            { _id: cid},
                            {products},
                            )
                        return ({ status: 'succes', payload: result });                    
                    } catch (error) {
                        console.log (error)
                    }
                }
            // Si no hay stock aviso
            } else {
                return ({ status: 'error', payload: `el producto ${pid} no existe en la base de datos` });
            }
        // Si falla, falla.
        } catch (error) {
            console.log (error)
            return res.send({ status: 'error', payload: error });
        }
    }
    async removeProductOfCart (pid, cid){
        try { // Falta sumar al array de productos cuando resta

            // Chequeo de existencia de propducto en el cart
            const virtualCart = await cartsModel.findById(cid)
            let existingProduct = -1
            const {products} = virtualCart
            products.length > 0 && (() =>  {
                existingProduct = products.findIndex(product => product.prodId === pid)
            })(); 

            // Si existe en el carrito me fijo cuantos quedan
            if (existingProduct != -1) {
                const newQuantity = products[existingProduct].quantity > 0 && (() => {products[existingProduct].quantity -= 1})()
                // Si quedan algunos, los voy sacando
                if (newQuantity > 0) {
                    const result = await cartsModel.updateOne(
                        { _id: cid, "products.prodId": pid },
                        { $set: { "products.$.quantity": newQuantity } })
                    return res.send({ status: 'succes', payload: result });
                // Si no queda ninguno lo borro de la lista
                } else if (newQuantity = 0) { //Falta poner para que borre de la lista
                    return res.send({ status: 'succes', payload: "product remove from cart"  });
                }
            } else {
                return ("The product wasnt found in the cart")
            }
        } catch (error) {
            console.log (error)
            return res.send({ status: 'error', payload: error });
        }
    }
}

module.exports = CartMongoManager;