const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de ecommerce api',
            description: 'Api pensada para ser soporte de un ecommerce en proceso de aprendizaje de backEnd',
        },
    },
    apis: [
        `${path.resolve(__dirname, `../docs/cartApi/cart.yaml${path.sep}`)}`,
        `${path.resolve(__dirname, `../docs/productApi/product.yaml${path.sep}`)}`,
    ],
};

module.exports = swaggerOptions;
