const { productService } = require ("../repositories/service.js")
const linkQueryMaker = require("../helpers/productsApiUtils/linkQueryMaker.js");
const paginateQueryMaker = require("../helpers/productsApiUtils/paginateQueryMaker.js");
// Funciones de procesamiento de request data


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

       console.log ("check params of product Controller is getProducts", category, disponibility, order, limit, onPage)

        const querys = paginateQueryMaker({category: categoriesArray, disponibility, order, limit, page: onPage})
       console.log ("check querys of product Controller is getProducts", querys)
        // Gestion de datos
        const result = await this.service.getProducts({filter: querys.filter, pagination: querys.pagination})
        
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
        const nextLink = `${linkQueryMaker(
            {category: category, disponibility: disponibility, order: order, limit: limit, thePage: nextPage}
        )}`
        const prevLink = `${linkQueryMaker(
            {category: category, disponibility: disponibility, order: order, limit: limit, thePage: prevPage}
        )}`
        // respuesta
        return ({
            docs: docs,
            totalPages: totalPages,
            prevPage: prevPage,
            nextPage: nextPage,
            page: page,
            hasPrevPage: hasPrevPage,
            hasNextPage: hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink 
        })
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