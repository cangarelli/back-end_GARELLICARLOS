// Modulos importados
const { cartsModel } = require('./models/carts.model.js');

// CLASE CONSTRUCTORA
class CartMongoManager {
    constructor() {}
    createCart = async () => await cartsModel.create({});

    getCartById = async (cid) => await cartsModel.findOne({ _id: cid });

    updateExistingProductQuantity = async (pid, cid, newQuantity) =>
        await cartsModel.updateOne(
            { _id: cid, 'products.product': pid },
            { $set: { 'products.$.quantity': newQuantity } }
        );

    emptyCart = async (cid) => await cartsModel.updateOne({ _id: cid }, { $set: { products: [] } });

    addNewProduct = async (cid, products) => await cartsModel.findOneAndUpdate({ _id: cid }, { products });

    deleteCart = async (cid) => await cartsModel.deleteOne({ _id: cid });

    removeProductFromCart = async (cid, pid) =>
        await cartsModel.updateOne({ _id: cid }, { $pull: { products: { product: pid } } });

    getAllKeyValues = async (key) => await cartsModel.distinct(key);
}

module.exports = CartMongoManager;
