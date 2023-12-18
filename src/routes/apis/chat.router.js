// Importación de modulos nativos
const { Router } = require('express');
const router = Router();
// Modulos para que interprete el body del request
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Importación modulos propios
const ChatManager = require ("../../dao/managers/ChatManager.js")

// Creación de instancia de manager
const chatBot = new ChatManager();

// Recuperar mensajes
router.get ("/", async (res, req) => {
    // Recuperar datos
    const messagesList = await chatBot.deliverMessagges()
    // Enviar datos
    if (messagesList.includes ({ error: 'Aún no se han enviado mensajes' })) {
        res.status(200).send({ status: 'succes', payload: messagesList });
    } else {
        return  res.status(200).send({ status: 'failed', payload: "No massages load" });
    }
    
})

// Recibir mensajes
router.post ("/", async (res, req) => {
    // Recuperar datos del request
    const message = req.body
    // Chequearlos

    // Cargar datos
    await chatBot.reciveMesagge(message)
    // Enviar respuesta
    res.status(200).send({ status: 'succes', payload: "mensaje cargado" })
})

// Exportación de rutas
module.exports = router;