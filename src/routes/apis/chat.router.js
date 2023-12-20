// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
// Modulos para que interprete el body del request
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Importación modulos propios
const ChatManager = require ("../../dao/managers/ChatManager.js")
const { messagesModel } = require ("../../dao/models/message.model.js")
// Creación de instancia de manager
const chatBot = new ChatManager();

// Recuperar mensajes
router.get ("/", async (req, res) => {
    // Recuperar datos File sysmtem
    const messagesList = await chatBot.deliverMessagges()
    const keys = Object.keys(messagesList);

    // Recuperar datos Mongoose
    const mongoMessages = await messagesModel.find({})
    console.log(mongoMessages)

    // Enviar datos
    if (keys.includes("error")) {
        return res.send({ status: 'failed', payload: "No massages load" });
    } else {
        return res.send({ status: 'succes', payload: mongoMessages });  
    }
})

// Recibir mensajes
router.post ("/", async (req, res) => {
    // Recuperar datos del request
    const message = req.body
    // Chequearlos

    // Cargar datos FileSystem
    await chatBot.reciveMesagge(message)
    // Cargar datos Mongoose
    await messagesModel.create(message)

    // Enviar respuesta
    res.status(200).send({ status: 'succes', payload: "mensaje cargado" })
})

// Exportación de rutas
module.exports = router;