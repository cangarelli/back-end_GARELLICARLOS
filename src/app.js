// Importación de modulos nativos para express
    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const path = require('path');
    const cookieParser = require("cookie-parser")
    const session = require ("express-session") /*Para generar que se guarden cookies con Sesion ID (no en Session Storage) */ 
    const FileStore = require ("session-file-store") /* Para generar storage de la sesion en archivos */
    const MongoStore = require ("connect-mongo") /* Para generar storage de la sesion en mongo db/atlas */
    const passport = require ("passport") /* Base de libreras de loguins con diferentes estrategias */
    const cors = require ("cors") /* Permite que la base de datos se use desde otros puertos */
    const compression = require ("express-compression")
// Config express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser("SecretWords"))
    app.use(cors())
    app.use(compression({
        brotli: {enabled: true, zlib: {}}
    }))
    /* Configuración de app.use(session...) con mogostorage ver clase sesion I min 61 v*/
    app.use(session({
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
        secret: "coderSecret", // Encriptado  
        resave: false,
        saveUninitialized: false
    }))
     
    app.use (session({
        secret:"SecretWords",
        resave: false,
        saveUninitialized: false
    }))

    const { initializePassportLocal, initializePassportGitHub, initializePassportJWT } = require ("./config/passport-config.js")
    // Estrategia JWT
    initializePassportJWT ()
    // EStrategia passport local
    initializePassportLocal()
    
    app.use (passport.initialize())
    app.use (passport.session())
    
    // initializePassportGitHub ()

// Activación de config personales
    const {connectDB, configObject: {PORT}} = require ("./config/mongoose-config.js")
    
    //Variables globales
        // const port = 8080;
        app.locals.port= PORT;

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

// Importacion y seteo de rutas en express
const appRouter = require ("./routes/index.js")
app.use (appRouter)



// Creacion de servidor HTTP
    const serverHTTP = app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });


// Configuración de serverSocket
    // Modulos nativos y express
    const io = require("socket.io");
    app.set('socketio', io);

    // Modulos propios y config
    const initializeSoketServer = require('./config/socket-config.js');
    initializeSoketServer (serverHTTP, PORT)
  
