const ProductMongoManager = require("../dao/managersMongo/ProductMongoManager");
const CartMongoManager = require("../dao/managersMongo/CartMongoManager");
const { chatService } = require ("../repositories/service.js")




class cartController{
    constructor(){
        this.service = chatService
    }

    messageSend = async (message, userMail) => await sendMessage (message, userMail)

    messagesGet =async() => {
        const messages = await this.service.getMessages()
        if (messages.length > 0 ) {
            return messages
         } else {
            console.log ("no hay mensajes")
            return { status: "error", payload: 'Aún no se han enviado mensajes' }
        } 
    }
}

module.exports = cartController;