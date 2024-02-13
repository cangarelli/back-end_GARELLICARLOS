const {Schema, model, default: mongoose} = require('mongoose')

const usersCollection = 'usuarios'

const UsersSchema = Schema({
    full_name: {
        type: String,
        required: true
    },
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
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    cartId: {
        type: String,
        required: true,
        unique: true,
        // posts:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'carts' }]
    },
    role: {
        type: String,
        default: "user"
    }
})

const usersModel = model(usersCollection, UsersSchema)

module.exports = {
    usersModel
};