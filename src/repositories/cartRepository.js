class cartRepository {
    constructor(dao) {
        this.daoService = dao;
    }

    createCart = async () => await this.daoService.createCart();

    getCartById = async (cid) => await this.daoService.getCartById(cid);

    updateExistingProductQuantity = async (pid, newQuantity) =>
        await this.daoService.updateExistingProductQuantity(pid, newQuantity);

    deleteCart = async (cid) => await this.daoService.deleteCart(cid);

    getAllKeyValues = async (key) => await this.daoService.getAllKeyValues(key);
}
module.exports = cartRepository;
