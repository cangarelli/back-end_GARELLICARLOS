const { logger } = require("../helpersBarrel");

async function apiCaller({ route, info, method }) {
    try {
        const response = await fetch(route, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        });
        const data = await response.json();
        const resolve = data.payload;
        return resolve;
    } catch (error) {
        logger.Fatal('Error al enviar la solicitud:', error);
    }
}

module.exports = apiCaller;
