const {Schema, model} = require('mongoose')

const messageCollection = 'Usuarios'

const MessageSchema = Schema({
    /* COMPLETAR ESQUEMA
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }*/
})

const messagesModel = model(messageCollection, MessageSchema)

module.exports = {
    messagesModel
}