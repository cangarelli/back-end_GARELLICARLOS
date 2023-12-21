const {Schema, model} = require('mongoose')

const cartsCollection = 'carts'

const CartsSchema = Schema({
    products: [{
        prodId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

const cartsModel = model(cartsCollection, CartsSchema)

module.exports = {
    cartsModel
}