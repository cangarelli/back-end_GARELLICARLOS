// Importación de modulos nativos para express
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const path = require('path');
    const cookieParser = require("cookie-parser")
    const session = require ("express-session") /*Para generar que se guarden cookies con Sesion ID (no en Session Storage) */ 
    const FileStore = require ("session-file-store") /* Para generar storage de la sesion en archivos */
    const MongoStore = require ("connect-mongo") /* Para generar storage de la sesion en mongo db/atlas */
    const passport = require ("passport")

// Config express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser("SecretWords"))
    app.use(session({ /* Configuración de cookie session storage ver clase sesion I min 61 */
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://agarelli91:5d8a6fsFWa6@anlugamescluster.mgh6ee1.mongodb.net/ecommerce",
            // mongoOptions: 
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true
            // },
            ttl: 3600000, // Tiempo de expiración en milisegundos (1 hora)
        }),
        cookie: {
            maxAge: 3600000, // Tiempo de expiración en milisegundos (1 hora)
        },
        secret: "coderSecret", /* Encriptado  */
        resave: false,
        saveUninitialized: false
    }))

    const { initializePassport } = require ("./config/passport-config.js")
    initializePassport()

    app.use (passport.initialize())
    app.use (passport.session())


    //Variables globales
        const port = 8080;
        app.locals.port = port;



// Activación de config personales
    const connectDB = require ("./config/mongoose-config.js")
    connectDB  ();





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
    const cartsRouter = require('./routes/apis/carts.router.js');
    const userRouter = require('./routes/apis/users.router.js');
    const viewsRouter = require('./routes/views.routes.js');
    const chatRouter = require ("./routes/apis/chat.router.js")
    const sessionRouter = require ("./routes/apis/session.router.js")


// Renderizado de rutas 
    /* Rutas de handelbars */
    app.use('/views', viewsRouter);

    /* rutas de la api */
    app.use('/api/products', productsRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/api/chat', chatRouter)
    app.use('/api/session', sessionRouter)
    app.use('/api/users', userRouter)

    /* Manejo de errores en el servidor */
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('error de server');
    });


// Creacion de servidor HTTP
    const serverHTTP = app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}`);
    });


// Configuración de serverSocket
    // Modulos nativos y express
    const io = require("socket.io");
    app.set('socketio', io);

    // Modulos propios y config
    const initializeSoketServer = require('./config/socket-config.js');
    initializeSoketServer (serverHTTP, port)
  
