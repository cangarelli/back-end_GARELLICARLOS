// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

// Importación de modulos propios
const UserMongoManager = require ("../../dao/managersMongo/UserMongoManager.js")

// Creación de instancias de managers
const userManager = new UserMongoManager ()

// Ruta base: "api/session/loguin/:email/log/:pass"
// Register
router.post('/register', async (req, res) => {})

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


