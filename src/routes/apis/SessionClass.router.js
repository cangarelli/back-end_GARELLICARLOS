const CustomRouter = require("../Routes.js");

const passport = require('passport');
const { createToken } = require('../../helpers/sessionApiUtils/jwt.js');
const { authorizationJWT, passportCall } = require('../../helpers/helpersBarrel.js');
const userController = require('../../controller/users.controller.js');
  
// Creación de instancias de managers
const userManager = new userController ()

const nameCookie = "token"
class SessionClassRouter extends CustomRouter {
    init (){

        //seteo de rutas
        this.get("/loguin", ["public"], async (req, res) =>{
            try {
                const response = await userManager.userCheck(req.body.email, req.body.password)
                if (response.status == "error") {
                   return  res.sendUserError(response.payload)
                } else {
                    const token = createToken (response)
                    return res.sendTokenSucces(response, nameCookie, token)
                }
            } catch (error) {
                console.log ("check error of session router is get method /loguin", error)
                return res.sendServerError(`${error}`)
            }
        })
        this.post("/register", async (req, res) =>{
            try {
                const response = await userManager.createUser(req.body)

                if (response.status == "error") {
                    return res.sendUserError(response.payload)
                } else {
                   return res.sendSuccess(response)
                }
            } catch (error) {
                console.log ("check error of session router is post method /register", error)
                return res.sendServerError(`${error}`)
            }
        })
        this.get("/current", ["public"], passportCall("jwt"), authorizationJWT('admin'), async (req, res) =>{
            try {
                res.send({message: "datos sencibles", user: req.user})
                // if (condition) {
                //     sendUserError(error)
                // } else {
                    // return send.sendSuccess(dato)
                // }
            } catch (error) {
                console.log ("check error of Session Class Router  is get method /current", error)
                return res.sendServerError(`${error}`)
            }
        })
        this.delete("/logout", async (req, res) =>{
            try {
                res.clearCookie(nameCookie);
                req.session.destroy (err => {
                    if (err) {
                        sendUserError(err)
                    } else {
                        sendSuccess("logout exitoso")
                    }
                })
            } catch (error) {
                console.log ("check error of x class router is delete method", error)
                return res.sendServerError(`${error}`)
            }
        })
    }
}
module.exports = SessionClassRouter