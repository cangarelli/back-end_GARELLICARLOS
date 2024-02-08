const {Router} = require ("express")
const router = Router()

// Importacion de rutas de expres
const productsRouter = require('./apis/products.router.js');
const cartsRouter = require('./apis/CartClass.router.js');
const usersRouter = require('./apis/UsersClass.router.js');
const viewsRouter = require("./views.routes.js");
const chatRouter = require ("./apis/chat.router.js")
const sessionRouter = require ("./apis/session.router.js")

const userRouter = new usersRouter ()
const cartRouter = new cartsRouter()

// Renderizado de rutas 
/* Rutas de handelbars */
router.use('/views', viewsRouter);
/* rutas de la api */
router.use('/api/products', productsRouter);
router.use('/api/carts', cartRouter.getRouter());
router.use('/api/chat', chatRouter)
router.use('/api/users', userRouter.getRouter())
router.use('/api/sessions', sessionRouter)

/* Manejo de errores en el servidor */
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error de server');
});


module.exports = router;