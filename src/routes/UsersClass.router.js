const CustomRouter = require("./Routes.js");

// Creación de instancias de managers
const userController = require('../controller/users.controller.js');
const cartController = require("../controller/carts.controller.js");
const userManager = new userController ()
const cartManager = new cartController()

class userClassRouter extends CustomRouter {
    init (){

        //seteo de rutas
        this.get("/:uid",["public"], async (req, res) =>{ // OK TODA LA RUTA Y SUS CAPAS
            try {
                const result = await userManager.getUser(req.params.uid)
                console.log ("check result of user Class Rotuer is get route", result)
                return result.status == "error" ? 
                    res.sendUserError(result.payload)
                :
                    res.sendSuccess(result)
            } catch (error) {
                console.log ("check get error of user class router is get method user", error)
                return res.sendServerError(`${error}`)
            }
        })
        this.post("/", async (req, res) =>{// OK TODA LA RUTA Y SUS CAPAS 
            try {
                const response = await userManager.createUser(req.body)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response)
            } catch (error) {
                console.log ("check error of user class router is post method ", error)
                cartManager.cleanCartsWhitOutUser()
                return res.sendServerError(`${error}`)
            } 

        })
        this.put("/:uid", async (req, res) =>{
            try {
                const response = await userManager.updateUser(req.params.uid, req.body)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)
            } catch (error) {
                console.log ("check error of user class router is put method", error)
                return res.sendServerError(`${error}`)
            } 
        })
        this.delete("/:uid", async (req, res) =>{
            try {
                const response = await userManager.deleteUser (req.params.uid)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response)
            } catch (error) {
                console.log ("check error of user class router is delete method", error)
                return res.sendServerError(`${error}`)
            } 
        })
    }
}
module.exports = userClassRouter