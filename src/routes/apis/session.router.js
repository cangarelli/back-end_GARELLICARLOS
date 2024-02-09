// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

// Importación de modulos propios
const UserMongoManager = require ("../../dao/managersMongo/UserMongoManager.js");
const passport = require('passport');
const { createToken, validateToken } = require('../../helpers/jwt.js');
const { passportCall } = require('../../helpers/passportCall.js');
const { authorizationJWT } = require('../../helpers/middleware/jwt-passport.middleware.js');

// Creación de instancias de managers
const userManager = new UserMongoManager ()

// Ruta base: "api/session/loguin/:email/log/:pass"


// Register JWT
router.post('/registerr', async (req, res) => {

})

// Loguin con JWT
router.post('/loguin', async (req, res) => {
    const {email, password} = req.body
    response = await userManager.userCheck(email, password)
    if (response.status == "succes") {
        console.log ("check response in sesion ruter is loguin", response)
        const {payload} = response
        const token = createToken ({id: payload.userId, role: payload.role, cartId: payload.cartId})

       return res.send(response)
    } else {
       return res.status(400).send(response)
    }
})



// Register passport local WORKING
router.post('/register', passport.authenticate("register", {failregister:"api/sessions/failregister"}),async (req, res) => {
    try {
        console.log ("check result del middlework de register route", req.user)
        if (typeof req.user == "object") {
            const {newUser} = req.user
            const token = createToken ({id: newUser._id, role: newUser.role, cartId: newUser.cartId}) 
            return res.cookie("token", token, {
                maxAge: 60*60*1000, 
                httpOnly: true, 
                secure: true, 
                sameSite: "none"})
                .send({status: "succes", payload: newUser, token})
        } else {
            return res.send({status: "error", payload: req.user})
        } 
    } catch (error) {
        console.log ("Crear usuario", error)
    }
})

// Loguin passport Local WORKING
router.get('/loguin/:email/log/:pass', async (req, res) => {
    try {
        const result = await userManager.userCheck({userMail: req.params.email, userPassword: req.params.pass})
        if (typeof result == "object") {
            req.session.Userdata = result
            console.log ("check result loguin route", result)
            const token = createToken ({id: result.userId, role: result.role, cartId: result.cartId})
            return res.cookie("token", token, {
                maxAge: 60*60*1000, 
                httpOnly: true, 
                secure: true, 
                sameSite: "none"})
                .send({status: "succes", payload: result})
        } else {
            return res.status(401).send({status: "error", payload: result})
        }

    } catch (error) {
        console.log ("check result loguin route catch", error)
        return res.status(500).send({status: "server error", payload: error})
    }
})

// WORKING
router.get ("/current", passportCall("jwt"), authorizationJWT("admin") ,(req, res) => {
    res.send({message: "datos sencibles", user: req.user})
})

// passport githubgt000 
 

router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async (req, res) => {})
router.get("/githubcallback", passport.authenticate("github", {failregister:"api/sessions/failregister"}), async (req, res) => {
    req.session.user = req.user
    res.redirect("/views/products ")
})

router.get("/failregister", (req, res)=> { 
    console.log ("Fail strategy")
    return res.send({status: "error", payload: "Fallo el registro por passport local"})
})
// ME QUEDE EN EL MINUTO 52



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


