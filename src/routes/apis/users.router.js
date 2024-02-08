// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
// Modulos para que interprete el body del request
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Importacion de modulos propios
const UserMongoManager = require ("../../dao/managersMongo/UserMongoManager.js");
const userController = require('../../controller/users.controller.js');

// Creación de instancias de managers
const userManager = new userController ()

// Configuración de rutas
// Ruta de base: "api/users"

// Crear usuario
router.post ("/", async (req, res) => {

    console.log ("check users router post body", req.body)
    const response = await userManager.createUser(req.body) 
    return res.send(response)

})


// Find user data by id
router.get("/:uid", async (req, res) => {
    try {
        console.log ("check params get log route", req.params)
        const result = await userManager.getUser(req.params.uid)
        console.log ("check result en users route", result)
        const {payload} = result
        const infoShare = {first_name: payload.first_name, last_name: payload.last_name}
        return res.send(infoShare)
    } catch (error) {
        console.log ("Encontra usuario data", error)
    }
})
// Actualizar usuario
router.put("/:uid", async (req, res) => {
    try {
        return res.send({status: "succses", payload: result})
    } catch (error) {
        console.log ("Actualizar usuario", error)
    }
})

// Borrar usuario
router.delete("/:uid", async (req, res) => {
    try {
        const result = await userManager.delete (req.params.uid)
        return res.send({status: "succses", payload: result})
    } catch (error) {
        console.log (error)
    }
})


// exportación de rutas como modulo
module.exports = router;