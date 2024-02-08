const ProductMongoManager = require("../dao/managersMongo/ProductMongoManager");
const CartMongoManager = require("../dao/managersMongo/CartMongoManager");


const uptadeStock = async (pid, stock, quantity) => {
    
    const newStock = parseInt(stock) - parseInt(quantity)
    const updateStock = {stock: parseInt(newStock) }

    await this.productManager.productUpdate(pid,updateStock)    
}

const addProductToCart = async (pid, cid, quantity) => {
    try { // Falta quitar del stock del array de productos cuando suma.
        // Carga de datos
        const hay = await  this.productManager.getProductsById(pid)
        const virtualCart = await  this.getOneCart(cid)
        
        console.log ("check virtualcart", virtualCart)
        // Chequeo si hay stock del producto.
        if (hay.stock > 0) {
            // Si hay stock me fijo si ya hay de ese producto en el carrito
            let existingProduct = -1
            
            const products = virtualCart.payload
            console.log ("check products", products)
            products.length > 0 && (() =>  {
                existingProduct = products.findIndex(products => products.product._id.equals(pid))
            })(); 
            console.log ("check existingProducts", existingProduct)
            // Si ya hay en el carrito agrego 1 al paquete
            if (existingProduct != -1) {
                // Manejo de cantidades en carrtio
                const newQuantity = parseInt(products[existingProduct].quantity) + parseInt(quantity)
                const result = this.service.updateExistingProductQuantity(pid, newQuantity )
                
                await uptadeStock (pid, parseInt(products[existingProduct].product.stock), quantity)

                // RESPUESTA EN RELACION AL MANEJO DEL CARRITO
                return ({ status: 'succes', payload: result });
            // Si no hay agrego uno creando el paquete
            } else {
                try {
                    // Manejo de cantidades en carrtio 
                    products.push({product: pid, quantity: parseInt(quantity)})
                    const result = await this.service.addNewProduct (cid, products)
                    
                    await uptadeStock (pid, hay.stock, quantity)

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
removeProductOfCart = async (pid, cid, quantity) => {
    try { // Falta sumar al array de productos cuando resta
        // Carga de datos
        const virtualCart = await  this.getOneCart(cid)
        console.log ("start removeProductOfCart")

        const products = virtualCart.payload

        // BUSQUEDA DE INDEX DE PRODUCTO A MODIFICAR
        const productIndex = products.findIndex(productObjetc => productObjetc.product._id.equals(pid))
    
        if (products[productIndex].quantity > quantity){
            console.log ("ingresa el primer if")
        // MANEJO DE CANTIDADES DEL CARRITO
            const newQuantity = parseInt(products[productIndex].quantity) + parseInt(quantity)
            const result = await updateExistingProductQuantity (pid,newQuantity)


            await uptadeStock (pid, parseInt(products[existingProduct].product.stock), quantity)

        // RESPONDE LO QUE RESPONDE DEL MANEJO DEL CARRITO
            return result
        } else if (products[productIndex].quantity <= quantity) {
            console.log ("ingresa al segundo if")
            const response = await this.service.deleteOneProduct (pid, cid)
            return response
        }
     f
    } catch (error) {
        console.log (error)
        return { status: 'error', payload: error }
    }
}
 
class cartController{
    constructor(){
        this.service = new CartMongoManager ()
        this.productManager = new ProductMongoManager()
    }
    createCart = async () => {
        const response = await this.service.createCart()
        return response
     }
    getOneCart = async (cid) => {
        const response = await this.service.getCartById(cid)
        return response
    }
    
    deleteOneProduct = async (pid, cid) =>{
        const virtualCart = await  this.getCart(cid)
        const products = virtualCart.payload

        productIndex = products.findIndex(productObjetc => productObjetc.product._id.equals(pid))

        await uptadeStock (pid, products[productIndex].product.stock, products[productIndex].quantity)
        // Manejo de cart
        const response = await this.service.deleteProductById(pid, cid) 

        // Respuesta
        return response
        
    }
    updateCart = async (pid, cid, quantity) => { 
        if (quantity > 0) {
            const response = addProductToCart (pid, cid, quantity)
            return response
        } else {
            const response = removeProductOfCart (pid, cid, quantity)
            return response
        }
    }

    

    emptyCart = async (cid) => {
        const response = await this.service.emptyCart(cid)
        return response
    }

    deleteCart = async (cid) => {
        const response = await this.service.deleteCart (cid)
        return response
     }

}

module.exports = cartController;