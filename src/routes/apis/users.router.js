// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
// Modulos para que interprete el body del request
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Importacion de modulos propios
const userModel = require ("../../dao/models/user.model")

// Configuración de rutas

router.get("/", async (req, res) => {
    const users = userModel.find({})
    res.send (users)
})
// exportación de rutas como modulo
module.exports = router;