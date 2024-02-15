function authentication (req, res, next) {
    // TOMA LAS VARIABLES DE LA FUNCION/METODO DE LA RUTA
    // GESTION DE LOGICA
    if (req.session.userName == "SSS") {

    }

    // INDICA SI CONTINUA O NO CON LOS PROCESOS DE COMPUTO
    next()
}

module.exports = authentication;