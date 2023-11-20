// Importaciones de modulos propios
import { ProductManager } from './ProductManager.js';

// Variables globales
const express = require('express');
const app = express();
const port = 8080;

//Creación de instancia de clase.
const productArray= new  ProductManager('src/productsDB.json'); 

app.use(
    express.urlencodedd({ extended: true })
); /* coso para que funcionen las query y otros datos complejos que todavía no se cuales son */

// Métodos de la API

app.get('/', (req, res) => {
    res.send('Hello World!... remember call /productos');
});

app.get('/productos', async (req, res) => {
    // recupero de variables dinamicas
    const limit = req.query.limit;
    console.log(limit);
    // Recupero de datos
    let listObjetcs = await productArray.getProducts(limit);

    // Lógica
    limit != undefined
        ? (listObjetcs = this.products.filter((producto) => producto.id))
        : (listObjetcs = this.products);

    // Envio de datos
    if (listObjetcs > 0) {
        console.log(`El producto que solicito por id fue ${JSON.stringify(listObjetcs)}`);
        return res.send(listObjetcs);
    } else {
        console.log('No hay productos registrados');
        return res.send({ error: 'El producto solicitado no existe' });
    }
});

app.get('/productos/:id', async (req, res) => {
    // recupero de variables dinamicas
    const id = req.params.id;
    // Recupero de datos
    let busqueda = await productArray.getProductsById(id);

    // Envio de datos
    if (busqueda == 'not found') {
        return res.send({ error: 'El producto solicitado no existe' });
    } else {
        return res.send(busqueda);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
