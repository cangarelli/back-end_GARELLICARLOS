const {Schema, model} = require('mongoose')

const cartsCollection = 'carts'

const CartsSchema = Schema({
    productsId: {
        type: Number,
        required: true
    }
})

const cartsModel = model(cartsCollection, CartsSchema)

module.exports = {
    cartsModel
}