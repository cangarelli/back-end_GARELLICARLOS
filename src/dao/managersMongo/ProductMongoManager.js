// Modulos importados
const paginateQueryMaker = require("../../helpers/paginateQueryMaker.js")
const { productsModel } = require ("../models/products.model.js")

// Funciones de procesamiento de request data
function selectorQuery(query1, query2, query3, query4) {
    const response = []
    // Manejo del $match
    if ( query1 != undefined && query2 == undefined) {
        response.push ({$match:{category: query1}})
    } else if (query1 == undefined && query2 != undefined)  {
        response.push ({$match:{status: query2}})
    } else if (query1 != undefined && query2 != undefined) {
        response.push ({$match:{category: query1, status: query2}})
    } else {
        response.push ({$match: {}})
    }
    // Manejo del $sort
    if (query3 != undefined) {
        response.push ({$sort: {price: Number(query3)}})
    }
    // Manejo del limit
    if (query4 != undefined) {
        response.push ({$limit: Number(query4)})
    }

    // Respuesta
    return (response)
}


// CLASE CONSTRUCTORA
class ProductMongoManager {
    constructor() {}
    async getProducts ({category, disponibility, order, limit, page}) {   
        try {
            const querys = paginateQueryMaker({category, disponibility, order, limit, page})
            console.log ("check query", querys)
            const result= await productsModel.paginate(querys.filter, querys.pagination)
            console.log ("check product Manager", result)
            return (result)
        } catch (error) {
            console.log (error)
            return (error);
        }
    }
    async getProductsById (pid) {
        try {
            const products = await productsModel.findOne({_id: pid})
            console.log ("Manager is get product by id check", products)
            return ({status: "succes", payload: products})
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: 'No hay productos registrados' });
        }
    }
    async createProduct (productArray) {
        try {
            const {title, price, category, description, stock, code, thumbnail} = productArray
            const result = await productsModel.create({
                title, price, category, description, stock, code, thumbnail, status: true
            })
            return ({status: "succes", payload: result})
        } catch (error){
            console.log (error)
            return ({status: "fail", payload: error})
        }
    }
    async updateProduct (pid, productArray) {
        try {
            const result = await productsModel.updateOne({_id: pid}, productArray)
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