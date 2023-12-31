const {Schema, model} = require('mongoose')

const usersCollection = 'Usuarios'

const UsersSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    gender: String, 
    password: {
        type: String,
        required: true
    },
    cartID: {
        type: String,
        required: true,
        unique: true
    }
})

const usersModel = model(usersCollection, UsersSchema)

module.exports = {
    usersModel
}