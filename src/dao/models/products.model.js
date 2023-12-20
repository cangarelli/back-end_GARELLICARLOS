const {Schema, model} = require('mongoose')

const productsCollection = 'Products'

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
    

})

const productsModel = model(productsCollection, productsSchema)

module.exports = {
    productsModel
}