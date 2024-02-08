const CustomRouter = require("../Routes.js");


// Creación de instancias de managers
const userController = require('../../controller/users.controller.js');
const userManager = new userController ()


class userClassRouter extends CustomRouter {
    init (){

        //seteo de rutas
        this.get("/:uid", async (req, res) =>{
            try {
                const result = await userManager.getUser(req.params.uid)
              
                if (result.status == "error") {
                    return res.sendUserError(result.payload)
                } else {
                    const {payload} = result
                    const infoShare = {first_name: payload.first_name, last_name: payload.last_name}
                    return res.sendSuccess(infoShare)
                }
            } catch (error) {
                return res.sendServerError(error)            }
        })
        this.post("/", async (req, res) =>{                       
            const response = await userManager.createUser(req.body)
            if (response.status == "error") {
                return res.sendUserError(response.payload)
            } else if (response.status == "error" && typeof response.payload == "object" ) {
                return res.sendServerError(response.payload)
            } else {
                return res.sendSuccess(response.payload)
            }
         })
        
            
        this.put("/:uid", async (req, res) =>{
            if (response.status == "error") {
                return res.sendUserError(response.payload)
            } else if (response.status == "error" && typeof response.payload == "object" ) {
                return res.sendServerError(response.payload)
            } else {
                return res.sendSuccess(response.payload)
            }
        })
        this.delete("/:uid", async (req, res) =>{
            // llamado al controller
            const response = await userManager.deleteUser (req.params.uid)
            console.log ("check delete route response", response)
            // Seteo re respuesta
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
module.exports = userClassRouter