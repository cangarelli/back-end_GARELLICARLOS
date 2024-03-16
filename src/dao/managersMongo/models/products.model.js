const { Schema, model, default: mongoose } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const productsCollection = 'Products';

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    owner: {
        type: String,
        default: 'admin',
    },
});

productsSchema.plugin(mongoosePaginate);

const productsModel = model(productsCollection, productsSchema);

module.exports = {
    productsModel,
};
