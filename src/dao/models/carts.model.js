const {Schema, model} = require('mongoose')

const cartsCollection = 'carts'

const CartsSchema = Schema({
    products: [{
        product: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
})

CartsSchema.pre("findOne", function () {
    this.populate("products.product")
})

const cartsModel = model(cartsCollection, CartsSchema)

module.exports = {
    cartsModel
}