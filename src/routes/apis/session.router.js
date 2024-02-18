// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

// Importación de modulos propios
const passport = require('passport');
const { createToken } = require('../../helpers/jwt.js');
const { authorizationJWT, passportCall } = require('../../helpers/helpersBarrel.js');
const userController = require('../../controller/users.controller.js');
  
// Creación de instancias de managers
const userManager = new userController ()

// Ruta base: "api/session/loguin/:email/log/:pass"

// Register JWT
router.post('/register', async (req, res) => {
    try {
        const response = await userManager.createUser(req.body)
        if (response.status == "error") {
            res.status(400).send(response)
        } else {
            const access_token = createToken (response)            
            res.send({status:"succes", payload: response, token: access_token})
        }
    } catch (error) {
        console.log ("check error of session router is post method /register", error)
        return res.status(500).send(`${error}`)
    }
    
})

// Loguin con JWT
router.get('/loguin', async (req, res) => {
    try {
        response = await userManager.userCheck(req.body.email, req.body.password)
    if (response.status == "error") {
        return res.status(401).send(response)

    } else {
        const token = createToken (response)
       return res.cookie("ecommerceCookie", token, {maxAge: 60*60*1000}).send(response)
    } 
    } catch (error) {
        console.log ("check error of session router is post method /loguin", error)
        return res.status(500).send(`${error}`)
    }
})
router.get ("/current", passportCall("jwt"), authorizationJWT("admin") ,(req, res) => {
    res.send({message: "datos sencibles", user: req.user})
})

// Log Out y destruir la sesion
router.delete('/logout', async (req, res) => {
    req.session.destroy (err => {
        if (err) { return res.send ({status: "error", payload: err})}
        res.send ({status: "succes", payload: "logout exitoso"})
    })
})

router.get('/getCookies', async (req, res) => {
    console.log (req.signedCookies)
})

// Exportación de rutas
module.exports = router;


