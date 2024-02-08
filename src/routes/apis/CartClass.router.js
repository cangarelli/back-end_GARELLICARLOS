const CustomRouter = require("../Routes");
const cartController = require("../../controller/carts.controller");

const CartManager = new cartController ()
class cartClassRouter extends CustomRouter {
    init (){

        //seteo de rutas
        this.get("/:cid", async (req, res) =>{
            const response = await CartManager.getOneCart(req.params.cid)
            if (response.status == "error") {
                return res.sendUserError(response.payload)
            } else if (response.status == "error" && typeof response.payload == "object" ) {
                return res.sendServerError(response.payload)
            } else {
                return res.sendSuccess(response.payload)
            }    
        })
        this.post("/", async (req, res) =>{
            const response = await CartManager.createCart()
            if (response.status == "error") {
                return res.sendUserError(response.payload)
            } else if (response.status == "error" && typeof response.payload == "object" ) {
                return res.sendServerError(response.payload)
            } else {
                return res.sendSuccess(response.payload)
            }
        })
        this.put("/:cid/product/:pid", async (req, res) =>{
            const response = await CartManager.createUser(req.body)
            if (response.status == "error") {
                return res.sendUserError(response.payload)
            } else if (response.status == "error" && typeof response.payload == "object" ) {
                return res.sendServerError(response.payload)
            } else {
                return res.sendSuccess(response.payload)
            }
        })
        // Actualizar todo el carrito ------------------------------ OK
        this.put("/:cid", async (req, res) => {})
        this.delete("/:cid/product/:pid", async (req, res) =>{
            const response = await CartManager.deleteOneProduct(req.params.pid, req.params.cid)
            if (response.status == "error") {
                return res.sendUserError(response.payload)
            } else if (response.status == "error" && typeof response.payload == "object" ) {
                return res.sendServerError(response.payload)
            } else {
                return res.sendSuccess(response.payload)
            }
        })
    }
}
module.exports = cartClassRouter