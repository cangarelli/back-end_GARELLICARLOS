// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

const ProductManager = require('../managers/ProductManager');
const catalogo = new ProductManager();

// SETEO DE RUTAS

router.get('/prod', async (req, res) => {
    /*render hace que envie lo va a buscar a los arcivos hbs en la carpeta viwews*/
    const productslist = await catalogo.getProducts();
    res.render('home', { products: productslist });
});

router.get('/realtimeproducts', async (req, res) => {
    const productslist = await catalogo.getProducts();
    res.render('realTimeProducts', { realTime: true, products: productslist });
});

module.exports = router;
