const { Schema, model, default: mongoose } = require('mongoose');

const tiketsCollection = 'tikets';

const TiketsSchema = Schema({
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
});

const tiketsModel = model(tiketsCollection, TiketsSchema);

module.exports = {
    tiketsModel,
};
