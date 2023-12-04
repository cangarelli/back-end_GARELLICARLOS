// Importación de modulos nativos
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//!!CONFIGURACION DE HANDELBARS!!
const handelbars = require('express-handlebars'); /* Inmportación de motor de plantillas */
app.engine(
    'hbs',
    handelbars.engine({
        extname: '.hbs',
        helpers: {
            root: () => path.join(__dirname, '/public'),
        },
    })
);

app.set('view engine', 'hbs'); /* Seteo de motor a utilizar */
app.set('views', __dirname + '/views'); /* Definición de ruta donde estan las plantillas */
//^^^^ CONFIGURACION DE HALDELBARS ^^^^

//config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ^^^^ RENDERIZADOS DE HANDELBARS ^^^^

// Importacion de rutas de expres
const productsRouter = require('./routes/apis/products.router.js');
const cartsRouter = require('./routes/apis/products.router.js');
const userRouter = require('./routes/apis/users.router.js');
const viewsRouter = require('./routes/views.routes.js');

//Variables globales
const port = 8080;

// !!RENDERIZADOS DE HANDELBARS!!
app.use('/views', viewsRouter);

// Métodos de la API
/* rutas de la api */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.get('/', (req, res) => {
    res.send('Hello World!... remember call /api/products or /api/carts');
});

// MANEJO DE ERRORES en el servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error de server');
});

const serverHTTP = app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
// Configuración de serverSocket

// Importación
const { Server } = require('socket.io');
const ProductManager = require('./managers/ProductManager.js');
const manejadorDatos = new ProductManager();

// Function eventlisteners
const serverSocket = new Server(serverHTTP);
serverSocket.on('connection', (socket) => {
    console.log('cliente conectado');
    socket.on('upLoadFormData', (data) => {
        console.log(data);
    });
    socket.on('update-product-db', async (data) => {
        if (data === 'change done') {
            const newProductList = await manejadorDatos.getProducts()
            serverSocket.emit('actualizar-pagina', newProductList);
        }
    });
    // socket.emit ("para el actual")
    // socket.broadcast.emit ("para todos menos el actual")
    // serverSocket.emit("para todos")
    let arrayMensajes = [];
    socket.emit('enviar-mensajes-cliente', arrayMensajes);
});
