// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
// Modulos para que interprete el body del request
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Importacion de modulos propios
const userModel = require ("../../dao/models/user.model")
const UserMongoManager = require ("../../dao/managersMongo/UserMongoManager.js")

// Creación de instancias de managers
const userManager = new UserMongoManager ()
// Configuración de rutas

// Crear usuario
router.post ("/", async (req, res) => {
    try {
        console.log ("check users router post body", req.body)
        const result = await userManager.create({
           first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email , password: req.body.password
        })         
        return res.send(result)
    } catch (error) {
        console.log ("Crear usuario", error)
    }
})


// Encontra usuario data
router.get("/:email/log/:pass", async (req, res) => {
    try {
        console.log ("check params get log route", req.params)
        const result = await userManager.userCheck({userMail: req.params.email, userPassword: req.params.pass})
        console.log ("check result en users route", result)
        req.session.Userdata = result.payload
        console.log ("check setting users router session", req.session.Userdata )
        return res.send(result)
    } catch (error) {
        console.log ("Encontra usuario data", error)
    }
})

router.get("/:uid", async (req, res) => {
    try {
        console.log ("check params get log route", req.params)
        const result = await userManager.userSearch({userId: req.params.uid})
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