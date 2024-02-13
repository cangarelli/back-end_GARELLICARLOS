const {Router} = require ("express")
const router = Router()

// Importacion de rutas de expres
const productsRouter = require('./apis/ProductClass.router.js');
const cartsRouter = require('./apis/CartClass.router.js');
const usersRouter = require('./apis/UsersClass.router.js');
const chatsRouter = require ("./apis/ChatClass.router.js")
const sessionRouter = require ("./apis/session.router.js")
const viewsRouter = require("./views.routes.js");

const userRouter = new usersRouter ()
const cartRouter = new cartsRouter()
const chatRouter = new chatsRouter()
const productRouter = new productsRouter()

// Renderizado de rutas 

/* rutas de la api */
router.use('/api/products', productRouter.getRouter());
router.use('/api/carts', cartRouter.getRouter());
router.use('/api/chat', chatRouter.getRouter())
router.use('/api/users', userRouter.getRouter())
router.use('/api/sessions', sessionRouter)

/* Rutas de handelbars */
router.use('/views', viewsRouter);

/* Manejo de errores en el servidor */
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('error de server');
});


module.exports = router;