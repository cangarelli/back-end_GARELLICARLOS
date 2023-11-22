// Importaciones de modulos propios
const ProductManager = require('./clases-constructoras/ProductManager.js');
const CarritoManager = require('./clases-constructoras/CarritoManager.js');

// Variables globales
const express = require('express');
const app = express();
const port = 8080;

//Creación de instancia de clase.
const productArray = new ProductManager('src/DB-files/productsDB.json');
const carrito = new CarritoManager('src/DB-files/carritoBackUp.json');

//config express
app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
); /* coso para que funcionen las query y otros datos complejos que todavía no se cuales son */

// Métodos de la API

app.get('/', (req, res) => {
    res.send('Hello World!... remember call /productos');
});

app.get('/products', async (req, res) => {
    // recupero de variables dinamicas
    const limit = req.query.limit;
    // Recupero de datos
    let listObjetcs = await productArray.getProducts();

    // Lógica
    limit != undefined
        ? (listObjetcs = listObjetcs.slice(0, limit))
        : console.log('La lista de productos va completa');

    // Envio de datos
    if (listObjetcs.length > 0) {
        return res.send(listObjetcs);
    } else {
        console.log('No hay productos registrados');
        return res.send({ error: 'No hay productos registrados' });
    }
});

app.get('/products/:id', async (req, res) => {
    // recupero de vari0ables dinamicas
    const id = req.params.id;

    // Recupero de datos
    const busqueda = await productArray.getProductById(id);

    // Envio de datos
    if (busqueda == 'Not found') {
        return res.send({ error: 'El producto solicitado no existe' });
    } else {
        return res.send(busqueda);
    }
});

app.listen(port, () => {
    console.log(`server is running on https://localhost:${port}`);
});
