// Importación de modulos de Socket.io
const { Server } = require('socket.io');

// Importación y generación de instancias de data managers
const { apiCaller, logger } = require('../helpers/helpersBarrel.js');

// SETEO DE EVENTOS
const marketUpdate = ({ socket, serverSocket, port }) => {
    socket.on('update-product-db', async (data) => {
        if (data === 'change done') {
            const newProductList = await apiCaller({
                route: `http://localhost:${port}/api/products/mongo`,
                method: 'GET',
            });
            logger.Debug('check product list on soket server', newProductList);
            serverSocket.emit('update-productList', newProductList);
        }
    });
};
const chatUpdate = ({ socket, serverSocket, port }) => {
    socket.on('message', async (data) => {
        logger.Debug('check soketio data', data);
        const messageList = await apiCaller({ route: `http://localhost:${port}/api/chat/`, method: 'GET' });
        logger.Debug('check message list en event listener app', messageList);
        serverSocket.emit('update-chat', messageList);
    });
};

// Configuración
const initializeSoketServer = (serverHTTP, port) => {
    // Configuración Sockey.io
    const serverSocket = new Server(serverHTTP, {
        cors: {
            origin: '*',
        },
    });

    // Configuración de Eventlisteners de socket.io
    serverSocket.on('connection', (socket) => {
        logger.Info('server.io connected');
        socket.on('conection', (data) => {
            logger.Info(data);
        });

        marketUpdate({ socket: socket, serverSocket: serverSocket, port });
        chatUpdate({ socket: socket, serverSocket: serverSocket, port });
        // socket.emit ("para el actual")
        // socket.broadcast.emit ("para todos menos el actual")
        // serverSocket.emit("para todos")
    });
};

module.exports = initializeSoketServer;
