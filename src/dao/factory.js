const { configObject } = require('../config/mongoose-config.js');

const cartDao = require('./managersMongo/CartMongoManager.js');
const chatDao = require('./managersMongo/ChatMongoManager.js');
const productDao = require('./managersMongo/ProductMongoManager.js');
const ticketDao = require('./managersMongo/TiketMongoManager.js');
const userDao = require('./managersMongo/UserMongoManager.js');

module.exports = {
    userDao,
    productDao,
    cartDao,
    chatDao,
    ticketDao,
};
