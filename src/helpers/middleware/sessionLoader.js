function sessionLoader(req, res, next) {
    if (req.session.Userdata ) {
        req.userSession = {
            first_name: req.session.Userdata.first_name,
            last_name: req.session.Userdata.last_name,
            userId: req.session.Userdata.userId,
            cartId: req.session.Userdata.cartId,
            role: req.session.Userdata.role == "admin" && true,
            prueba: "chequeo que no genere nada nuevo"
        }
    }
    else {
        req.userSession = {
            first_name: null,
            last_name: null,
            userId: null,
            cartId: null,
            role: null,
            prueba: "chequeo que no genere nada nuevo" 
        }
    }
        // INDICA SI CONTINUA O NO CON LOS PROCESOS DE COMPUTO
        next()
}
module.exports = sessionLoader;