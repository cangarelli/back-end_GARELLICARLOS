
class ticketRepository {
    constructor(dao) {
        this.daoService = dao
    }
    getOneTicket = async (tiketId) => await this.daoService.findOne({ _id: tiketId })

    makeATicket = async (purchaseData) => await this.daoService.makeATicket(purchaseData)

    getOneKeyData = async (key) => await this.daoService.getOneKeyData(key)
}
module.exports = ticketRepository