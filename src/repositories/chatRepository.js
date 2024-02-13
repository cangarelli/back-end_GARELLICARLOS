class chatRepository {
    constructor(dao){
        this.daoService = dao
    }

    sendMessage = async (message, userMail) => await this.daoService.sendMessage(message, userMail)
    
    getMessages = async () => await this.daoService.getMessages()
}
module.exports = chatRepository