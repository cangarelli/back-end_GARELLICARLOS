const { userDao, cartDao, productDao, chatDao } = require("../dao/factory.js");
const cartRepository = require("./cartRepository.js");
const chatRepository = require("./chatRepository.js");
const productRepository = require("./productsRepository.js");
const usersRepository = require("./userRepository.js");

const userService = new usersRepository (userDao)
const cartService = new cartRepository (cartDao)
const productService = new productRepository (productDao)
const chatService = new chatRepository (chatDao)

module.exports = {
    userService, 
    cartService,
    productService,
    chatService
}