const amountCalculator = (purchaseList) =>{
    let cuenta = []
    let totalAmount
    const result = purchaseList.forEach(element => {
        result = {product: element.product, amount: element.quantity * element.price}
        cuenta.push (result)
    });
    totalAmount = cuenta.reduce((acc, product)=>{ acc + product.amount })[0]
    return totalAmount
}
module.exports = amountCalculator