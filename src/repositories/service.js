const { userDao, cartDao, productDao, chatDao, ticketDao } = require('../dao/factory.js');
const cartRepository = require('./cartRepository.js');
const chatRepository = require('./chatRepository.js');
const productRepository = require('./productsRepository.js');
const usersRepository = require('./userRepository.js');
const ticketRepository = require('./ticketRepository.js');

const userService = new usersRepository(new userDao());
const cartService = new cartRepository(new cartDao());
const productService = new productRepository(new productDao());
const chatService = new chatRepository(new chatDao());
const ticketService = new ticketRepository(new ticketDao());

module.exports = {
    userService,
    cartService,
    productService,
    chatService,
    ticketService,
};
