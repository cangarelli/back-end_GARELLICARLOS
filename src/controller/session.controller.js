const UserMongoManager = require("../dao/managersMongo/UserMongoManager");


class sessionController{
    constructor(){
        this.service = new UserMongoManager ()
    }
    
    getCart = async () => { }
    createCart = async () => { }
    updateCart = async () => { }
    deleteCart = async () => { }

}

module.exports = sessionController;