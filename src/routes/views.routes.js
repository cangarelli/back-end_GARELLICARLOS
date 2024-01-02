// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
//Importacion de modulos propios
const apiCaller = require('../helpers/apiCaller');
const linkQueryMaker = require('../helpers/linkQueryMaker');


// SETEO DE RUTAS

router.get('/products', async (req, res) => {

    // SETEO DE PARAMETROS DE QUERYS
    let {category, status, order, limit, onPage} = req.query
    // Seteo de queryroutes
    limit = limit || 4
    const querys = linkQueryMaker(
        {category: category, disponibility: status, order: order, limit: limit, thePage: onPage})
   
    try {
        // FILTRO DE PRODCUTOS SEGUN ESPECIFIACION DE LA QUERY
        const data = await apiCaller ({ route:`http://localhost:${req.app.locals.port}/api/products/mongo${querys}`, method: "GET" })
        const {            
            docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            nextLink,
            prevLink
        }  = data

        // SETEO DE CATEGORIAS PARA SEARCH BAR
        const categorysArray = await apiCaller ({ route:`http://localhost:${req.app.locals.port}/api/products/mongokeydata/category`, method: "GET" })

        //Renderizado
        res.render('home', { 
            products: docs, 
            categorysList: categorysArray, 
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            nextLink,
            prevLink });
    } catch (error) {
        console.log (error)
    }

});

router.get ("/product/:pid", async (req, res) => {
    console.log ("pega en ruta")
    try {
        const result = await apiCaller ({ route:`http://localhost:${req.app.locals.port}/api/products/mongo/${req.params.pid}`, method: "GET" })
        console.log ("chequeo data for render", result)
        //Renderizado
        res.render('productDetail', { product: result });
    } catch (error) {
        console.log (error)
    }
    
})
/* RUTAS FUERA DE USO
router.get('/realtimeproducts', async (req, res) => {
    // Recupero de lista de prouctos
    const productslist = await apiCaller ({ route:`http://localhost:${port}/api/products/`, method: "GET" })

    //Renderizado
    res.render('realTimeProducts', { realTime: true, products: productslist });
});
*/

router.get("/chatApp/", async (req, res) => {
    //Recupero de mensajes
    const messagesList = await apiCaller ({ route: `http://localhost:${req.app.locals.port}/api/chat/`, method: "GET" })
    const nombre = false
    //Renderizado
    res.render("chat", {messagesList, user:nombre} )
})
router.get("/cart/:cartid", async (req, res) => {
    const {cartid} = req.params
    console.log ("CartView check 0", cartid)
    try {
        //Taer carrito usando populate de mongo
        const cart = await apiCaller ({ route:`http://localhost:${req.app.locals.port}/api/carts/${cartid}`, method: "GET" })
        console.log ("cartView Check", cart)

        // Renderizado de pagina
        res.render("cart", { products: cart })
    } catch (error) {
        console.log (error)
    }

})
module.exports = router;
