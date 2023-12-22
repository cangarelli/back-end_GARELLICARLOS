// Modulos importados
const { productsModel } = require ("../models/products.model.js")

// CLASE CONSTRUCTORA
class ProductMongoManager {
    constructor() {}
    async getProducts () {
        try {
            const products = await productsModel.find({})
            return ({status: "succes", payload: products})
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: 'No hay productos registrados'});
        }
    }
    async getProductsById (pid) {
        try {
            const products = await productsModel.findOne({_id: pid})
            console.log ("coso", products)
            return ({status: "succes", payload: products})
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: 'No hay productos registrados' });
        }
    }
    async createProduct (productArray) {
        try {
            const {title, price, description, stock, code, thumbnail} = productArray
            const result = await productsModel.create({
                title, price , description, stock, code, thumbnail, status: true
            })
            return ({status: "succes", payload: result})
        } catch (error){
            console.log (error)
            return ({status: "fail", payload: error})
        }
    }
    async updateProduct (pid, productArray) {
        try {
            const {prodId} = req.params
            const {title, price, description, stock, code, thumbnail, status} = productArray
            const productToUpdate = {title, price , description, stock, code, thumbnail, status}
            const result = await productsModel.updateOne({_id: pid, productToUpdate})
            console.log (result)
           return ({status: "succes", payload: result})
        } catch (error){
            console.log (error)
            return ({status: "error", payload: error})
        }
    }

    async deleteProduct (pid) {
        try {
            const response = await productsModel.deleteOne({ _id: pid })
            return ({status: "succes", payload: response})
        } catch (error){
            console.log (error)
            return ({status: "succes", payload: error})
        }
    }
}

module.exports = ProductMongoManager;