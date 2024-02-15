const CustomRouter = require("../Routes");
const cartController = require("../../controller/carts.controller");

const CartManager = new cartController ()
class cartClassRouter extends CustomRouter {
    init (){

        //seteo de rutas
        this.get("/:cid", ["public"], async (req, res) =>{
            try {
                const response = await CartManager.getOneCart(req.params.cid)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)  
            } catch (error) {
                return res.sendServerError(response.payload)
            } 
        })
        this.post("/", async (req, res) =>{
            try {
                const response = await CartManager.createCart()
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)  
            } catch (error) {
                return res.sendServerError(response.payload)
            } 
        })
        this.put("/:cid/product/:pid", async (req, res) =>{
            try {
                const response = await CartManager.updateCart(req.params.pid, req.params.cid, quantity)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)  
            } catch (error) {
                return res.sendServerError(response.payload)
            } 
        })

        this.put("/:cid", async (req, res) => {})
        this.delete("/:cid/product/:pid", async (req, res) =>{
            try {
                const response = await CartManager.deleteOneProduct(req.params.pid, req.params.cid)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)  
            } catch (error) {
                return res.sendServerError(response.payload)
            } 
        })
        this.delete("/:cid", async (req, res) =>{
            try {
                const response = await CartManager.deleteCart(req.params.cid)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)  
            } catch (error) {
                return res.sendServerError(response.payload)
            } 
        })
    }
}
module.exports = cartClassRouter