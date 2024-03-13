// Modulos importados
const { cartsModel } = require('./models/carts.model.js');
const apiCaller = require('../../helpers/productsApiUtils/apiCaller.js');
const { log } = require('winston');

// CLASE CONSTRUCTORA
class CartMongoManager {
    constructor() {}
    createCart = async () => await cartsModel.create({});

    getCartById = async (cid) => await cartsModel.findOne({ _id: cid });

    updateExistingProductQuantity = async (pid, cid, newQuantity) =>
        await cartsModel.updateOne(
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': newQuantity } }
        );

    addNewProduct = async (cid, products) => await cartsModel.findOneAndUpdate({ _id: cid }, { products });

    deleteCart = async (cid) => await cartsModel.deleteOne({ _id: cid });

    removeProductById = async (cid, id, cantidad) => 'working on it';

    getAllKeyValues = async (key) => await cartsModel.distinct(key);

    /* En DESUSO
    async addProductToCart (pid, cid, quantity){
        try { // Falta quitar del stock del array de productos cuando suma.
            // Carga de datos
            const hay = await productsModel.findById(pid)
            const virtualCart = await cartsModel.findOne({_id: cid})
            
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
                    // Manejo de cantidades en carrtio
                    const newQuantity = parseInt(products[existingProduct].quantity) + parseInt(quantity)
                    const result = await cartsModel.updateOne(
                        { _id: cid, "products.product": pid },
                        { $set: { "products.$.quantity": newQuantity } })
                    console.log ("check primer if result", result)

                    // Manejo de cantidades en stock
                    const newStock = parseInt(products[existingProduct].product.stock) - parseInt(quantity)
                    const updateStock = {stock: parseInt(newStock) }
                    
                    await apiCaller ({ route:`http://localhost:8080/api/products/mongo/${pid}`, info: updateStock, method: "PUT" })

                    // RESPUESTA EN RELACION AL MANEJO DEL CARRITO
                    return ({ status: 'succes', payload: result });
                // Si no hay agrego uno creando el paquete
                } else {
                    try {
                        // Manejo de cantidades en carrtio 
                        products.push({product: pid, quantity: parseInt(quantity)})
                        const result = await cartsModel.findOneAndUpdate(
                            { _id: cid},
                            {products},
                            )
                        
                        // Manejo de cantidades en stock
                        const newStock = parseInt(hay.stock) - parseInt(quantity)
                        const updateStock = {stock: parseInt(newStock) }
                            
                        await apiCaller ({ route:`http://localhost:8080/api/products/mongo/${pid}`, info: updateStock, method: "PUT" })

                        // RESPUESTA EN RELACION AL MANEJO DEL CARRITO
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

    
    // HECHO HASTA ACTUALIZA EL STOCK
    async removeProductOfCart (pid, cid, quantity){
        try { // Falta sumar al array de productos cuando resta
            // Carga de datos
            console.log ("start removeProductOfCart")
            const cart = await cartsModel.findOne({_id: cid})

            const {products} = cart

            // BUSQUEDA DE INDEX DE PRODUCTO A MODIFICAR
            const productIndex = products.findIndex(productObjetc => productObjetc.product._id.equals(pid))
        

            if (products[productIndex].quantity > quantity){
                console.log ("ingresa el primer if")
            // MANEJO DE CANTIDADES DEL CARRITO
                const newQuantity = parseInt(products[productIndex].quantity) + parseInt(quantity)
                const result = await cartsModel.updateOne(
                    { _id: cid, "products.product": pid },
                    { $set: { "products.$.quantity": newQuantity } })

            // MANEJO DE CANTIDADES DEL STOCK
                const newStock = parseInt(products[productIndex].product.stock) - parseInt(quantity)
                const updateStock = {stock: parseInt(newStock) }
                
                await apiCaller ({ route:`http://localhost:8080/api/products/mongo/${pid}`, info: updateStock, method: "PUT" })

            // RESPONDE LO QUE RESPONDE DEL MANEJO DEL CARRITO
                return result
            } else if (products[productIndex].quantity <= quantity) {
                console.log ("ingresa al segundo if")
                const response = await deleteProductById (pid, cid)
                return response
            }
         f
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
            const cartupdate = await cartsModel.findOneAndUpdate(
                {_id: cid},
                {$pull: {products: {product: pid}}},
                {new: true}
            )

            return ({ status: 'succes', payload: cartupdate.products });
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: error });
        }
    }
    */
}

module.exports = CartMongoManager;
