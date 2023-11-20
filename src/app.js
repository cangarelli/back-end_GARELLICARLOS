// Importaciones de modulos propios
import { ProductManager, productArray, controler } from './main.js';

// Variables globales
const express = require('express');
const app = express();
const port = 3000;

app.use(
    express.urlencodedd({ extended: true })
); /* coso para que funcionen las query y otros datos complejos que todavía no se cuales son */

// Instanciando clase y generando datos para la base de datos
controler()


// Métodos de la API

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/productos', async (req, res) => {
    // Llamado a método de funcion.
    await productArray.getProducts();

    //Envio de datos
    res.send('Hello World!');
});

app.get('/productos?limit=', async (req, res) => {
    // recupero de variables dinamicas
    const limit = req.query.limit;

    // Llamado a método de clase.
    await productArray.getProductsConLimite(limit);
    // Envio de datos
    res.send('Hello World!');
});

app.get('/productos/:id', async (req, res) => {
    // recupero de variables dinamicas
    const id = req.params.id;
    // Llamado a método de clase.
    await productArray.getProductsById(id);
    // Envio de datos
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
