function sessionLoader(req, res, next) {
    if (req.session.Userdata ) {
        req.userSession = {
            saludo: req.session.Userdata.saludo,
            userId: req.session.Userdata.userId,
            cartId: req.session.Userdata.cartId,
            role: req.session.Userdata.role == "admin" && true,
        }
    }
    else {
        req.userSession = {
            saludo: null,
            userId: null,
            cartId: null,
            role: null 
        }
    }
        // INDICA SI CONTINUA O NO CON LOS PROCESOS DE COMPUTO
        next()
}
module.exports = sessionLoader;