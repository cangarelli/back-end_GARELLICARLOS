// Importación de modulos nativos para express
const express = require('express');
const {
    expressConfig,
    handelbarsConfig,
    connectDB,
    initializePassportJWT,
    initializeSoketServer,
} = require('./config/configBarrel.js');
const { logger } = require('./helpers/helpersBarrel.js');

const app = express();
// Express config
expressConfig(app);

//Passport config
const passport = require('passport'); /* Base de libreras de loguins con diferentes estrategias */
// Estrategia JWT
initializePassportJWT();
app.use(passport.initialize());
app.use(passport.session());

// Coneccion a mongoose
connectDB();

// Configuración de handlebars
handelbarsConfig(app);

// Importacion y seteo de rutas en express
const appRouter = require('./routes/index.js');
app.use(appRouter);

// Creacion de servidor HTTP
const serverHTTP = app.listen(app.locals.port, () => {
    logger.Info(`Server is running on http://localhost:${app.locals.port}`);
});

// Configuración de serverSocket
// Modulos nativos y express
const io = require('socket.io');
app.set('socketio', io);

// Modulos propios y config
initializeSoketServer(serverHTTP, app.locals.port);
