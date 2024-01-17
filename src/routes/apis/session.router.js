// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

// Importación de modulos propios
const UserMongoManager = require ("../../dao/managersMongo/UserMongoManager.js");
const passport = require('passport');

// Creación de instancias de managers
const userManager = new UserMongoManager ()

// Ruta base: "api/session/loguin/:email/log/:pass"

// Register
router.post('/register', passport.authenticate("register", {failregister:"api/sessions/failregister"}),async (req, res) => {
    try {
        console.log ("check users router post body", req.body)
        const result = await userManager.create({
           first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email , password: req.body.password
        })         
        return res.send(result)
    } catch (error) {
        console.log ("Crear usuario", error)
    }
    // Guardar y recuperar las credenciales del usuario de sesion
    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    passport.deserializeUser(async(id, done)=>{
        let user //busqueda por id de los datos del usuario
        done(null, user)
    })

})
router.get("/failregister", (req, res)=> { 
    console.log ("Fail strategy")
    return res.send({status: "error", payload: "Fallo el registro por passport local"})
})



// Loguin
router.get('/loguin/:email/log/:pass', async (req, res) => {
    try {
        const result = await userManager.userCheck({userMail: req.params.email, userPassword: req.params.pass})
        req.session.Userdata = result.payload
        return res.send(result)
    } catch (error) {
        console.log ("Encontra usuario data", error)
    }

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


