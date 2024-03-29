// Modulos importados
const { productsModel } = require('./models/products.model.js');

// CLASE CONSTRUCTORA
class ProductMongoManager {
    constructor() {}
    getProducts = async ({ filter, pagination }) => await productsModel.paginate(filter, pagination);

    getOneKeyData = async (key) => await productsModel.distinct(key);

    getProductsById = async (pid) => await productsModel.findOne({ _id: pid });

    checkProduct = async (productId, ownerEmail) =>
        await productsModel.findOne({ _id: productId, owner: ownerEmail });

    productCreate = async ({ title, price, category, description, stock, code, thumbnail, status, owner }) =>
        await productsModel.create({
            title,
            price,
            category,
            description,
            stock,
            code,
            thumbnail,
            status,
            owner,
        });

    productUpdate = async (pid, productArray) => await productsModel.updateOne({ _id: pid }, productArray);

    productDelete = async (pid) => await productsModel.deleteOne({ _id: pid });

    getType = async (key) => await productsModel.path('correo').type;
}

module.exports = ProductMongoManager;
