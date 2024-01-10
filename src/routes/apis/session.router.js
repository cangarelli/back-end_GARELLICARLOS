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
router.get('/loguin', authentication, async (req, res) => {})
// Log Out
router.delete('/logout', async (req, res) => {})


router.get('/getCookies', async (req, res) => {
    console.log (req.signedCookies)
})
//Destruir la sesion
router.get('/logOut', async (req, res) => {
    req.session.destroy (err => {
        if (err) { return res.send ({status: "error", payload: err})}
        res.send ("logout exitoso")
    })
})
// Exportación de rutas
module.exports = router;


