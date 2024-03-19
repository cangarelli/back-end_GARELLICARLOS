class productRepository {
    constructor(dao) {
        this.daoService = dao;
    }

    getProducts = async ({ filter, pagination }) => await this.daoService.getProducts({ filter, pagination });

    getOneKeyData = async (key) => await this.daoService.getOneKeyData(key);

    getProductsById = async (pid) => await this.daoService.getProductsById(pid);

    productCreate = async ({ title, price, category, description, stock, code, thumbnail, status, owner }) =>
        await this.daoService.productCreate({
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

    checkProduct = async (productId, ownerEmail) => await this.daoService.checkProduct (productId, ownerEmail) 

    productUpdate = async (pid, productArray) => await this.daoService.productUpdate(pid, productArray);

    productDelete = async (pid) => await this.daoService.productDelete(pid);

    getType = async (key) => (await this.daoService) - getType(key);
}
module.exports = productRepository;
