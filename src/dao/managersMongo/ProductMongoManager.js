// Modulos importados
const paginateQueryMaker = require("../../helpers/apiUtils/paginateQueryMaker.js")
const { productsModel } = require ("./models/products.model.js")

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
    async getProducts ({filter, pagination}) {   
        try {
            const result= await productsModel.paginate(filter, pagination)
            return (result)
        } catch (error) {
            console.log (error)
            return ({status: "error", payload: error});
        }
    }
    async getOneKeyData (key) {
        try {
            const keyData = await productsModel.distinct(key);
            return ({
                status:"success",
                payload: keyData
            })
        } catch (error) {
            console.log (error)
            return ({
                status:"error",
                payload: error
            })
        }
    }
    async getProductsById (pid) {
        try {
            const product = await productsModel.findOne({_id: pid})
            return ({status: "succes", payload: product})
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: error });
        }
    }
    async productCreate ({title, price, category, description, stock, code, thumbnail, status}) {
        try {
            const result = await productsModel.create({
                title, price, category, description, stock, code, thumbnail, status
            })
            return ({status: "succes", payload: result})
        } catch (error){
            console.log (error)
            return ({status: "error", payload: error})
        }
    }
    async productUpdate (pid, productArray) {
        try {
            const result = await productsModel.updateOne({_id: pid}, productArray)
           return ({status: "succes", payload: result})
        } catch (error){
            console.log (error)
            return ({status: "error", payload: error})
        }
    }

    async productDelete (pid) {
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