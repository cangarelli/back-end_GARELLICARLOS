class cartRepository {
    constructor(dao) {
        this.daoService = dao;
    }

    createCart = async () => await this.daoService.createCart();

    getCartById = async (cid) => await this.daoService.getCartById(cid);

    addNewProduct = async (cid, products) => await this.daoService.addNewProduct(cid, products);

    updateExistingProductQuantity = async (pid, cid, newQuantity) =>
        await this.daoService.updateExistingProductQuantity(pid, cid, newQuantity);

    deleteCart = async (cid) => await this.daoService.deleteCart(cid);

    getAllKeyValues = async (key) => await this.daoService.getAllKeyValues(key);
}
module.exports = cartRepository;
