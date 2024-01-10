const {Schema, model, default: mongoose} = require('mongoose')

const usersCollection = 'usuarios'

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
    cartId: {
        type: String,
        required: true,
        unique: true
    }
})

const usersModel = model(usersCollection, UsersSchema)

module.exports = {
    usersModel
};