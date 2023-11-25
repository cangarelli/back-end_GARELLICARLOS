// Importaciones de modulos propios
const ProductManager = require('./managers/ProductManager.js');
const CartManager = require('./managers/CartManager.js');

// Importación de modulos nativos
const express = require('express');
const app = express();
const userRouter = require('./routes/users.router.js')
// const { uploader } = require('./helpers/uploader.js')

//Variables globales
const port = 8080;

//Creación de instancia de clase.
const productArray = new ProductManager('src/DB-files/productsDB.json');
const cart = new CartManager('src/DB-files/carritoBackUp.json');

//config express
app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
); /* coso para que funcionen las query y otros datos complejos que todavía no se cuales son */

// Métodos de la API

app.get('/', (req, res) => {
    res.send('Hello World!... remember call /products');
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
    console.log(`server is running on http://localhost:${port}`);
});
