const { logger } = require('../helpers/helpersBarrel.js');
const { chatService } = require('../repositories/service.js');

class cartController {
    constructor() {
        this.service = chatService;
    }

    messageSend = async (message, userMail) => await sendMessage(message, userMail);

    messagesGet = async () => {
        const messages = await this.service.getMessages();
        if (messages.length > 0) {
            return messages;
        } else {
            logger.Info('no hay mensajes');
            return { status: 'error', payload: 'Aún no se han enviado mensajes' };
        }
    };
}

module.exports = cartController;
