// Importación de modulos nativos
const { Router } = require('express');
const router = Router();

// Importación de modulos propios
const authentication = require ("../../helpers/middleware/auth.middlewere")

// Ruta base: api/session
// Crear la sesion

// Log Up
router.post('/register', async (req, res) => {})
// Log In
router.post('/loguin', async (req, res) => {
    try {
        console.log ("Check loguin route body", req.body.payload)
        req.session.user = req.body.payload
    } catch (error) {
        console.log (error)
    }
})
// Log Out
router.delete('/logout', async (req, res) => {})


router.get('/getCookies', async (req, res) => {
    console.log (req.signedCookies)
})
//Destruir la sesion
router.delete('/logOut', async (req, res) => {
    req.session.destroy (err => {
        if (err) { return res.send ({status: "error", payload: err})}
        res.send ("logout exitoso")
    })
})
// Exportación de rutas
module.exports = router;


