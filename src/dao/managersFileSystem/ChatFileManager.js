//Modulos nativos importados
const fs = require('fs');
const leerDB = require('../../helpers/fileManagers/recuperarDatos');
const guardarDatos = require('../../helpers/fileManagers/persistenciaDatos');

// CLASE CONSTRUCTORA
class ChatManager {
    constructor() {
        this.messagesList = [];
        this.path = 'src/DB-files/messageList.json';
    }
    async sendMessage (message, userMail) {
        // Recuperar datos
        this.messagesList = await leerDB (this.path)
        // Agregar mensaje
        this.messagesList.push ({userMail, message })
        // Guardar Datos
        await guardarDatos (this.path, this.messagesList)

        return {succes: `message ${message} upload`}
     
    }
    async getMessages () {
        // Recuperar datos
        this.messagesList = await leerDB (this.path)

        // Dar respuesta
        if (this.messagesList.length > 0 ) {
            return this.messagesList
         } else {
            console.log ("no hay mensajes")
                return { error: 'Aún no se han enviado mensajes' }
        } 
    }
}

module.exports = ChatManager;