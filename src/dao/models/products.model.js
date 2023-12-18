const {Schema, model} = require('mongoose')

const productsCollection = 'Usuarios'

const productsSchema = Schema({
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

const productsModel = model(productsCollection, productsSchema)

module.exports = {
    productsModel
}