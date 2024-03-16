const { logger } = require('../errorsUtils/logger.js');

const amountCalculator = (purchaseList) => {
    let cuenta = [];
    let totalAmount;

    purchaseList.forEach((element) => {
        let result = { product: element.pid, amount: element.quantity * element.price };
        cuenta.push(result);
    });
    totalAmount = cuenta.reduce((acc, product) => acc + product.amount, 0);
    logger.Debug('check totalAmount of amountCalculator', totalAmount);

    return totalAmount;
};
module.exports = amountCalculator;
