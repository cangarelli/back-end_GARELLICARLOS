
// Importación de modulos nativos
const express = require('express');
const app = express();
const userRouter = require('./routes/users.router.js');
// const { uploader } = require('./helpers/uploader.js')

//config express
app.use(express.json());
app.use(
    express.urlencoded({ extended: true })
); 
/* coso para que funcionen las query y otros datos complejos que todavía no se cuales son */
// app.use(express.static("/static",__dirname+"public"))


// Importacion de rutas
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');

//Variables globales
const port = 8080;

// Métodos de la API
/* rutas de la api */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.get('/', (req, res) => {
    res.send('Hello World!... remember call /api/products or /api/cart');
});

// MANEJO DE ERRORES en el servidor
app.use((err, req, res, next) => {
    console.error (err.stack)
    res.status (500).send("error de server")
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
