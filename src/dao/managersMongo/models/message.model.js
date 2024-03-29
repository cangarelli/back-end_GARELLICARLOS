const { Schema, model } = require('mongoose');

const messageCollection = 'messages';

const MessageSchema = Schema({
    userMail: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

const messagesModel = model(messageCollection, MessageSchema);

module.exports = {
    messagesModel,
};
