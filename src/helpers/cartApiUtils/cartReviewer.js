const cartReviewer = async (serviceManager, cid, pid) => {
    const virtualCart = await serviceManager.getOneCart(cid)
    let existingProduct = -1           
    const products = virtualCart.payload
    console.log ("check products", products)

    products.length > 0 && (() =>  {
        existingProduct = products.findIndex(products => products.product._id.equals(pid))
    })(); 
    if ( existingProduct != -1)  {
        return ({prodIndex: existingProduct, quantityOnCart: parseInt(products[existingProduct].quantity), products})
    } else {
        return ({prodIndex: existingProduct})
    } 
}
module.exports = cartReviewer