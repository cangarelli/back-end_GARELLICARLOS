// Modulos importados
const { tiketModel } = require ("./models/tiket.model.js")
const {createHash, passwordValidator} = require ("../../helpers/userApiUtils/hashPasswordManager.js")

// CLASE CONSTRUCTORA
class TiketMongoManager {
    constructor() {}
    
    getOneTicket = async (tiketId) => await productsModel.findOne({_id: tiketId})

    makeATicket = async (purchaseData) => await tiketModel.create(purchaseData)
    
    getOneKeyData = async (key) => await productsModel.distinct(key)
}

module.exports = TiketMongoManager;