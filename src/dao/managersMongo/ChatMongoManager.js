// Importacion de modulos
const {messagesModel} = require ("./models/message.model.js")

// CLASE CONSTRUCTORA
class ChatMongoManager {
    constructor() {}
    async sendMessage (message, userMail) {
        try {
            const messages = await messagesModel.create({userMail , message})
            return ({status: "succes", payload: messages})
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: error});
        }
    }
    async getMessages () {
        // Recuperar datos
        try {
            const messages = await messagesModel.find({})
            if (messages.length > 0 ) {
                return messages
             } else {
                console.log ("no hay mensajes")
                return { error: 'Aún no se han enviado mensajes' }
            } 
        } catch (error) {
            console.log (error)
            return (error)
        }
        
       
        // Dar respuesta

    }
}

module.exports = ChatMongoManager;