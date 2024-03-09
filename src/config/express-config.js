// Importación de modulos nativos para express
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser'); /* Modulo para escribir y leer las cookies cifrandolas */
const session = require('express-session'); /*Para generar que se guarden cookies con Sesion ID (no en Session Storage) */
const MongoStore = require('connect-mongo'); /* Para generar storage de la sesion en mongo db/atlas */
const cors = require('cors'); /* Permite que la base de datos se use desde otros puertos */
const compression = require('express-compression'); /* Modulos para comprimir response: Gzip y Brotli*/
const { logger, addLogger } = require('../helpers/helpersBarrel.js');

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
    app.use(
        cors({
            origin: [`http://localhost:${app.locals.port}`, 'http://localhost:5173'],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        })
    );

    // Cookies y session
    app.use(cookieParser('SecretWords')); // Local .Cookies

    app.use(
        // Global: req.session
        session({
            store: MongoStore.create({
                // Acá configuro donde y como se guardaron los datos de la session
                mongoUrl:
                    'mongodb+srv://agarelli91:5d8a6fsFWa6@anlugamescluster.mgh6ee1.mongodb.net/ecommerce',
                ttl: 60 * 60 * 1000, // Tiempo de expiración en milisegundos (1 hora)
            }),
            cookie: {
                // Aca configuro la cookie que se guardara en el navegador web
                maxAge: 60 * 60 * 1000, // Tiempo de expiración en milisegundos (1 hora)
                httpOnly: true,
            },
            secret: 'SecretWords', // Encriptado dentro del servidor
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(
        compression({
            brotli: { enabled: true, zlib: {} },
        })
    );

    // Manejo de logs
    app.use(addLogger);
};

module.exports = expressConfig;
