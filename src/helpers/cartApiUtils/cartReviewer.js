const { logger } = require('../errorsUtils/logger.js');

const cartReviewer = async (virtualCart, pid, cid) => {
    console.log('check virtualCart ', virtualCart);
    console.log('check rest of params', pid, cid);
    let existingProduct = -1;
    const { products } = virtualCart;
    console.log(virtualCart);
    console.log(products);
    logger.Debug('check products', products);

    products.length > 0 &&
        (() => {
            existingProduct = products.findIndex((products) => products.product._id.equals(pid));
        })();
    if (existingProduct != -1) {
        return {
            prodIndex: existingProduct,
            quantityOnCart: parseInt(products[existingProduct].quantity),
        };
    } else {
        return { prodIndex: existingProduct, products };
    }
};
module.exports = cartReviewer;
