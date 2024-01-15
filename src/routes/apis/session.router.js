// Importación de modulos nativos
const { Router } = require('express');
const router = Router();


// Ruta base: api/session


// Log Out
// router.delete('/logout', async (req, res) => {
//     req.session.destroy(function(err) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.redirect('/');
//         }
//       });
// })


router.get('/getCookies', async (req, res) => {
    console.log (req.signedCookies)
})
//Destruir la sesion
router.delete('/logOut', async (req, res) => {
    req.session.destroy (err => {
        if (err) { return res.send ({status: "error", payload: err})}
        res.send ({status: "sicces", payload: "logout exitoso"})
    })
})
// Exportación de rutas
module.exports = router;


