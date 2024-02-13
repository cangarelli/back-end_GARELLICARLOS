const { productService } = require ("../repositories/service.js")
const linkQueryMaker = require("../helpers/apiUtils/linkQueryMaker");
const paginateQueryMaker = require("../helpers/apiUtils/paginateQueryMaker");

class productController{
    constructor(){
        this.service = productService
    }
    
    getProducts = async ({category, disponibility, order, limit, onPage}) => {
        // Procesamiento de request
        let categoriesArray 
        if (category != undefined) {
            categoriesArray = category.split(',');
        }
        const querys = paginateQueryMaker({category: categoriesArray, disponibility, order, limit, page: onPage})
       
        // Gestion de datos
        const result = await this.service.getProducts({filter: querys.filter, pagination: querys.pagination})
        
        // Gestion de respuesta
        if (result.status) {
            return result
        } else {
        // Destructuring
        const {
            docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage
        } = result 
        // Creacion de querys
        const nextLink = `/views/products${linkQueryMaker(
            {category: category, disponibility: disponibility, order: order, limit: limit, thePage: nextPage}
            )}`
        const prevLink = `/views/products${linkQueryMaker(
            {category: category, disponibility: disponibility, order: order, limit: limit, thePage: prevPage}
            )}`
        // respuesta
        return ({
            status:"success",
            payload: {
                docs: docs,
                totalPages: totalPages,
                prevPage: prevPage,
                nextPage: nextPage,
                page: page,
                hasPrevPage: hasPrevPage,
                hasNextPage: hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink 
            }})
        }
     }
    getProduct = async (pid) => {
            const response = await this.service.getProductsById(pid)
            return (response)
     }
    getSelectiveData = async (key) => {
        const response = await this.service.getOneKeyData(key)
        return (response)
    }
    createProduct = async (productArray) => {
        const {title, price, category, description, stock, code, thumbnail} = productArray
        const response = await this.service.productCreate({
            title, price, category, description, stock, code, thumbnail, status: true
        })
        return response
     }
    updateProduct = async (pid, data) => {
        const result = await this.service.productUpdate(pid, data)
        return (result)
     }
    deleteProduct = async (pid) => { 
        const result = await this.service.productDelete(pid) 
        return result
    }

}

module.exports = productController;