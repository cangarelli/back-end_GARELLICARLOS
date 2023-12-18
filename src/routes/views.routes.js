// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

const ProductManager = require('../dao/managers/ProductManager');
const catalogo = new ProductManager();

// SETEO DE RUTAS

router.get('/prod', async (req, res) => {
    /*render hace que envie lo va a buscar a los archivos hbs en la carpeta viwews*/
    const productslist = await catalogo.getProducts();
    //Renderizado
    res.render('home', { products: productslist });
});

router.get('/realtimeproducts', async (req, res) => {
    // Recupero de lista de prouctos
    const productslist = await catalogo.getProducts();

    //Renderizado
    res.render('realTimeProducts', { realTime: true, products: productslist });
});
router.get("/chatApp", (req, res) => {
    //Recupero de mensajes
    const messagesList = "await postMan.deliverMessages()"

    //Renderizado
    res.render("chatApp", {messagesList} )
})

module.exports = router;
