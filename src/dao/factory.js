const { configObject } = require("../config/mongoose-config.js")

configObject
let userDao
let productDao
let cartDao
let chatDao

switch (configObject.percistance) {
    case "file":
        userDao = require ("./managersFileSystem/UserFileManager.js")
        productDao = require("./managersFileSystem/ProductFileManager.js")
        cartDao = require ("./managersFileSystem/CartFileManager.js")
        chatDao = require ("./managersFileSystem/ChatFileManager.js")
    break;
    case "memory":
        
    break;
    default:
        const userDaoGetter =  require ("./managersMongo/UserMongoManager.js")
        userDao = userDaoGetter
        productDao = require("./managersMongo/ProductMongoManager.js")
        cartDao = require ("./managersMongo/CartMongoManager.js")
        chatDao = require ("./managersMongo/ChatMongoManager.js")
        break;
}

module.exports = {
    userDao,
    productDao,
    cartDao,
    chatDao
}