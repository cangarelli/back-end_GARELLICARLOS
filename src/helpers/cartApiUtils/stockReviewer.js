const stockReviewer = async (manager, purchaseList) => {
    // Seteo de variables internas
    let virtualProductList = [];
    // Procesamiento de cada producto de la lista
    for await (const prod of purchaseList) {
        // Seteo de variables internas
        let quantityBuy = 0;
        let quantityNotBuy = 0;
        let quantityStock;
        // Busqueda del producto con productController
        const productInStock = await manager.getProductsById(prod.prod);

        // Gestion de la informacíón del vendedor
        if (productInStock.stock > 0 && productInStock.stock >= prod.quantity) {
            quantityBuy = prod.quantity;
            quantityStock = productInStock.stock - prod.quantity;
        } else if (productInStock.stock > 0 && productInStock.stock < prod.quantity) {
            quantityNotBuy = prod.quantity - productInStock.stock;
            quantityBuy = prod.quantity - quantityNotBuy;
            quantityStock = 0;
        } else {
            return null;
        }
        // Resumen de la informacion del vendedor
        const productData = {
            pid: prod.prod,
            quantity: quantityBuy,
            remainingForBuying: quantityNotBuy,
            remainingStock: quantityStock,
            price: productInStock.price,
        };
        virtualProductList.push(productData);
    }
    // Envio de respuesta
    return virtualProductList;
};

module.exports = stockReviewer;
