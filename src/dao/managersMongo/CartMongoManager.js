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
    // GET CART BY ID WORKING
    async getCartById (cid) {
        try {
            const cart = await cartsModel.findOne({_id: cid})
            console.log ("mongoManager Check", cart)
            console.log (cart.products)
            return ({ status: 'succes', payload: cart.products });
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: error });
        }
    }
    // ADD PRODUCTS TO CART WORKING
    async addProductToCart (pid, cid, quantity){
        try { // Falta quitar del stock del array de productos cuando suma.
            // Carga de datos
            const hay = await productsModel.findById(pid)
            const virtualCart = await cartsModel.findById(cid)
            console.log ("check virtualcart", virtualCart)
            // Chequeo si hay stock del producto.
            if (hay.stock > 0) {
                // Si hay stock me fijo si ya hay de ese producto en el carrito
                let existingProduct = -1
                const {products} = virtualCart
                console.log ("check products", products)

                products.length > 0 && (() =>  {
                    existingProduct = products.findIndex(products => products.product._id.equals(pid))
                })(); 
                console.log ("check existingProducts", existingProduct)
                // Si ya hay en el carrito agrego 1 al paquete
                if (existingProduct != -1) {
                    
                    const newQuantity = quantity ?
                        parseInt(products[existingProduct].quantity) + parseInt(quantity)
                        :  parseInt(products[existingProduct].quantity) + 1
                    const result = await cartsModel.updateOne(
                        { _id: cid, "products.product": pid },
                        { $set: { "products.$.quantity": newQuantity } })
                        console.log ("check primer if result", result)
                    return ({ status: 'succes', payload: result });
                // Si no hay agrego uno creando el paquete
                } else {
                    try {
                        products.push({product: pid, quantity: Number(1)})
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
            return ({ status: 'error', payload: error });
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
    // EMPTY CART WORKING
    async emptyCart (cid){
        try {
            const cart = await cartsModel.updateOne(
                {_id: cid},
                {$set: {products: []}},
                {new: true})
            console.log ("empty cart Check", cart)
            console.log (cart.products)
            return ({ status: 'succes', payload: cart.products });
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: error });
        }
    }
    // Quitar producto del carrito Working
    async deleteProductById (pid, cid) {
        try {
            const cart = await cartsModel.findOneAndUpdate(
                {_id: cid},
                {$pull: {products: {product: pid}}},
                {new: true})
            return ({ status: 'succes', payload: cart.products });
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: error });
        }
    }
}

module.exports = CartMongoManager;