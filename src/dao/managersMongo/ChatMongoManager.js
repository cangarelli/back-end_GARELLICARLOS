// Importacion de modulos
const {messagesModel} = require ("./models/message.model.js")

// CLASE CONSTRUCTORA
class ChatMongoManager {
    constructor() {}
    sendMessage = async (message, userMail) => await messagesModel.create({userMail , message})
 
    getMessages =async() => await messagesModel.find({})
}

module.exports = ChatMongoManager;