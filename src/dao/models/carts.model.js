const {Schema, model} = require('mongoose')

const cartsCollection = 'carts'

const CartsSchema = Schema({
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

const cartsModel = model(cartsCollection, CartsSchema)

module.exports = {
    cartsModel
}