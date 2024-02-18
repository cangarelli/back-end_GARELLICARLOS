const CustomRouter = require("../Routes");
const cartController = require("../../controller/carts.controller");

const CartManager = new cartController ()
class cartClassRouter extends CustomRouter {
    init (){

        //seteo de rutas


        this.post("/:cid/purchase", async (req, res) =>{ // COMPLETAR
            try {
                const response = await CartManager.purchase({pid, quantity, purchaser })
                return response.status == "error" ?
                res.sendUserError(response.payload)
            :
                res.sendSuccess(response)  
            } catch (error) {
                console.log ("check error of cart class router is post method /:cid/purchase", error)
                return res.sendServerError(error)
            }
        })

        this.get("/:cid", ["public"], async (req, res) =>{
            try {
                const response = await CartManager.getOneCart(req.params.cid)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)  
            } catch (error) {
                console.log ("check error of cart class router is get method /:cid", error)
                return res.sendServerError(error)
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