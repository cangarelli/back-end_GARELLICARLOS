// Importación de modulos nativos para express
const express = require('express');
const app = express();
const { expressConfig, handelbarsConfig, connectDB, initializePassportJWT, configObject: {PORT}, initializeSoketServer } = require ("./config/configBarrel.js")

// Express config
expressConfig (app)
app.locals.port= PORT


//Passport config
const passport = require ("passport"); /* Base de libreras de loguins con diferentes estrategias */

// Estrategia JWT
initializePassportJWT ()
app.use (passport.initialize())
app.use (passport.session())
    
// Coneccion a mongoose
connectDB  ();

// Configuración de handlebars
handelbarsConfig (app)


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
initializeSoketServer (serverHTTP, PORT)