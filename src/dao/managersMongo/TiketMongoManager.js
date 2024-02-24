// Modulos importados
const { tiketsModel } = require ("./models/tiket.model.js")
const {createHash, passwordValidator} = require ("../../helpers/userApiUtils/hashPasswordManager.js")

// CLASE CONSTRUCTORA
class TiketMongoManager {
    constructor() {}
    
    getOneTicket = async (tiketId) => await tiketsModel.findOne({_id: tiketId})

    makeATicket = async (purchaseData) => await tiketsModel.create(purchaseData)
    
    getOneKeyData = async (key) => await tiketsModel.distinct(key)
}

module.exports = TiketMongoManager;