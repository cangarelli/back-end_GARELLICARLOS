const { logger } = require('../errorsUtils/logger.js');

const cartReviewer = async (serviceManager, cid, pid) => {
    const virtualCart = await serviceManager.getCartById(cid);
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
