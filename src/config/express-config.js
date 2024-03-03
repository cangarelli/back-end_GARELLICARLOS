// Importación de modulos nativos para express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser'); /* Modulo para escribir y leer las cookies cifrandolas */
const session = require('express-session'); /*Para generar que se guarden cookies con Sesion ID (no en Session Storage) */
const MongoStore = require('connect-mongo'); /* Para generar storage de la sesion en mongo db/atlas */
const cors = require('cors'); /* Permite que la base de datos se use desde otros puertos */
const compression = require('express-compression'); /* Modulos para comprimir response: Gzip y Brotli*/

// Config express
const expressConfig = (app) => {
    const { configObject } = require('./configBarrel.js');

    // Enrutados y params
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Puerto
    app.locals.port = configObject.PORT;

    // Seguridad y optimización de manejo de datos
    app.use(cors());
    app.use(
        compression({
            brotli: { enabled: true, zlib: {} },
        })
    );

    // Cookies y session
    app.use(cookieParser('SecretWords'));
    app.use(
        session({
            store: MongoStore.create({
                mongoUrl:
                    'mongodb+srv://agarelli91:5d8a6fsFWa6@anlugamescluster.mgh6ee1.mongodb.net/ecommerce',
                ttl: 3600000, // Tiempo de expiración en milisegundos (1 hora)
            }),
            cookie: {
                maxAge: 3600000, // Tiempo de expiración en milisegundos (1 hora)
            },
            secret: 'coderSecret', // Encriptado
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(
        session({
            secret: 'SecretWords',
            resave: false,
            saveUninitialized: false,
        })
    );
};

module.exports = expressConfig;
