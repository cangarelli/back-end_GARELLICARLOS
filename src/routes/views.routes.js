// Importación de modulos nativos
const { Router } = require('express');
const router = Router();


const ProductManager = require("../managers/ProductManager")
const catalogo = new ProductManager ()

// SETEO DE RUTAS

router.get('/', (req, res) => {
    
    /*render hace que envie lo va a buscar a los arcivos hbs en la carpeta viwews*/
    res.render('index');
});
router.get('/prod', async (req, res) => {
    /*render hace que envie lo va a buscar a los arcivos hbs en la carpeta viwews*/
    const productslist = await catalogo.getProducts()
    res.render('products', {name: "Juan Lobos", products: productslist});
});

module.exports = router;
