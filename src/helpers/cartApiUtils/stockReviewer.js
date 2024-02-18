const stockReviewer = async (manager, purchaseList ) => {
    let virtualProductList = []

    const sellerService = await purchaseList.forEach(async (prod) => {
        let quantityBuy = 0
        let quantityNotBuy = 0
        let quantityStock
        const productInStock = await manager.getProductsById(prod.product)
        if (productInStock.stock > 0 && productInStock.stock >= quantity ) {
            quantityBuy =  quantity
            quantityStock = productInStock.stock - quantity
        } else if (productInStock.stock > 0 && productInStock.stock < quantity ) {
            quantityNotBuy = quantity - productInStock.stock
            quantityBuy =  quantity - quantityNotBuy
            quantityStock = 0
        } 
        const productData = {pid: productInStock.product, quantity: quantityBuy, remainingForBuying: quantityNotBuy ,remainingStock: quantityStock, price: productInStock.price }
        virtualProductList.push (productData)
    })
    return virtualProductList
}

module.exports = stockReviewer