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
const ChatMongoManager = require("../../dao/managersMongo/ChatMongoManager.js")

// Creación de instancia de manager
const chatBot = new ChatManager();
const mongoChat = new ChatMongoManager();

// Recuperar mensajes
router.get ("/", async (req, res) => {
    const response = await mongoChat.getMessages()
    return res.send({ status: 'succes', payload: response});  

})

// Recibir mensajes
router.post ("/", async (req, res) => {
    // Recuperar datos del request
    const {message, user} = req.body
    // Subir mensajes
    const response = await mongoChat.sendMessage (message, user)
    return res.send (response)
})

// Exportación de rutas
module.exports = router;