// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
//Importacion de modulos propios
const apiCaller = require('../helpers/apiCaller');


// SETEO DE RUTAS

router.get('/products', async (req, res) => {
    /*render hace que envie lo va a buscar a los archivos hbs en la carpeta viwews*/
    try {
        const result = await apiCaller ({ route:`http://localhost:${req.app.locals.port}/api/products/mongo`, method: "GET" })
        const categorysArray = result.reduce((array, prod ) => {
            if (!array.includes(prod.category)) {
                console.log ("chek in")
                array.push (prod.category) ;
            }
            return array
        }, []);
        console.log(categorysArray)

        //Renderizado
        res.render('home', { products: result, categorysList: categorysArray});
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
