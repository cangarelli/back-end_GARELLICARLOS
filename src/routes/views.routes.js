// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
//Importacion de modulos propios
const apiCaller = require('../helpers/apiCaller');


// SETEO DE RUTAS

router.get('/prod', async (req, res) => {
    /*render hace que envie lo va a buscar a los archivos hbs en la carpeta viwews*/
    const productslist = await apiCaller ({ route:`http://localhost:${req.app.locals.port}/api/products/`, method: "GET" })

    //Renderizado
    res.render('home', { products: productslist });
});

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
router.get("/chatApp/:user", async (req, res) => {
    //Recupero de mensajes
    const messagesList = await apiCaller ({ route: `http://localhost:${req.app.locals.port}/api/chat/`, method: "GET" })
    console.log (req.params.user)
    let nombre = req.params.user
    //Renderizado
    res.render("chat", {messagesList, user:nombre} )
})
module.exports = router;
