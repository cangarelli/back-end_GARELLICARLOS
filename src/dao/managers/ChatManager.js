//Modulos nativos importados
const fs = require('fs');
const leerDB = require('../../helpers/recuperarDatos');
const guardarDatos = require('../../helpers/persistenciaDatos');

// CLASE CONSTRUCTORA
class ChatManager {
    constructor() {
        this.messagesList = [];
        this.path = 'src/DB-files/messageList.json';
    }
    async reciveMesagge (message) {
        // Recuperar datos
        this.messagesList = await leerDB (this.path)
        // Agregar mensaje
        this.messagesList.push (message)
        // Guardar Datos
        await guardarDatos (this.path, this.messagesList)

        return {succes: `message ${message} upload`}
        {user, message}
    }
    async deliverMessagges () {
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