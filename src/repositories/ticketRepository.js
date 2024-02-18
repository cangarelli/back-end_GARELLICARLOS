
class ticketRepository {
    constructor(dao) {
        this.daoService = dao
    }
    getOneTicket = async (tiketId) => await this.daoService.findOne({ _id: tiketId })

    makeATicket = async (purchaseData) => await this.daoService.create(purchaseData)
}
module.exports = ticketRepository