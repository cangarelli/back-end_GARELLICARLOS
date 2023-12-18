// Importación de modulos nativos para express
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const path = require('path');

// Config express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());


// Configuracion mongose
    // Importación de modulo mongoose.connect con destructuring
        const { connect } = require("mongoose")
    // Cración de conección
        const connectDB = async () => {
            await connect("mongodb+srv://agarelli91:5d8a6fsFWa6@anlugamescluster.mgh6ee1.mongodb.net/ecommerce?retryWrites=true&w=majority")
            console.log ("Base de datos conectada")
        }




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

// Importacion de rutas de expres
    const productsRouter = require('./routes/apis/products.router.js');
    const cartsRouter = require('./routes/apis/products.router.js');
    const userRouter = require('./routes/apis/users.router.js');
    const viewsRouter = require('./routes/views.routes.js');
    const chatRouter = require ("./routes/apis/chat.router.js")


// Renderizado de rutas 
    /* Rutas de handelbars */
    app.use('/views', viewsRouter);

    /* rutas de la api */
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter);
    app.use("/api/chat", chatRouter)

    /* Manejo de errores en el servidor */
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('error de server');
    });

//Variables globales
    const port = 8080;
// Creacion de servidor HTTP
    const serverHTTP = app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
    });


// Configuración de serverSocket

    // Importación de modulos de Socket.io
        const { Server } = require('socket.io');
        const io = require("socket.io")


    // Importación y generación de instancias de data managers
        const apiCaller = require ("./helpers/apiCaller.js")
    // Configuración Sockey.io
        app.set('socketio', io);
        const serverSocket = new Server(serverHTTP);

    // Variables del chat
    const messageList = [];

    // Configuración de Eventlisteners de socket.io
        serverSocket.on('connection', (socket) => {
            console.log('cliente conectado');
            socket.on('upLoadFormData', (data) => {
                console.log(data);
            });
            socket.on('update-product-db', async (data) => {
                if (data === 'change done') {
                    const newProductList = await apiCaller ({ route:`http://localhost:${port}/api/products/`, method: "GET" })
                    serverSocket.emit('actualizar-pagina', newProductList);
                }
            });
            socket.on('message', async (data) => {
                if (data.length > 0) {
                    const messageList = await apiCaller ({ route: `http://localhost:${port}/api/chat/`, method: "GET"})
                    messageList.push(data)
                    await apiCaller ({ route: `http://localhost:${port}/api/chat/`, info: messageList, method: "PUT"})
                }
            })
            // socket.emit ("para el actual")
            // socket.broadcast.emit ("para todos menos el actual")
            // serverSocket.emit("para todos")
            let arrayMensajes = [];
            socket.emit('enviar-mensajes-cliente', arrayMensajes);
        });
