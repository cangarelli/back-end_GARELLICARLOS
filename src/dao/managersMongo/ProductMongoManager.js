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
    getProducts = async ({filter, pagination}) => await productsModel.paginate(filter, pagination)
    
    getOneKeyData = async (key) => await productsModel.distinct(key)
        
    getProductsById = async (pid) => await productsModel.findOne({_id: pid})

    productCreate = async ({title, price, category, description, stock, code, thumbnail, status}) => 
        await productsModel.create({
            title, price, category, description, stock, code, thumbnail, status
        })
    
    productUpdate = async (pid, productArray) => await productsModel.updateOne({_id: pid}, productArray)
       
    productDelete = async (pid) => await productsModel.deleteOne({ _id: pid })
}

module.exports = ProductMongoManager;