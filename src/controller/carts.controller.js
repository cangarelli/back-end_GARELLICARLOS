const {
    ticketCodeGenerator,
    timeGetter,
    amountCalculator,
    cartReviewer,
    stockReviewer,
} = require('../helpers/helpersBarrel.js');
const { productService, cartService, userService, ticketService } = require('../repositories/service.js');

const addProductToCart = async (pid, cid, quantity) => {
    const sellerData = await stockReviewer(this.productManager, [{ prod: pid, quantity }]);

    // Chequeo si hay stock del producto.
    if (sellerData.quantity > 0) {
        const cartData = await cartReviewer(this.service, cid, pid);

        // Si ya hay en el carrito agrego 1 al paquete
        if (cartData.prodIndex != -1) {
            // Manejo de cantidades en carrtio
            const fullRequest = cartData.quantityOnCart + parseInt(quantity);
            const newSellerData = await stockReviewer(this.productManager, [{ prod: pid, fullRequest }]);
            const result = this.service.updateExistingProductQuantity(pid, newSellerData.quantity);
            // RESPUESTA EN RELACION AL MANEJO DEL CARRITO
            return { status: 'succes', payload: result };
            // Si no hay agrego uno creando el paquete
        } else {
            // Manejo de cantidades en carrtio
            cartData.products.push({ product: pid, quantity: parseInt(quantity) });
            const result = await this.service.addNewProduct(cid, cartData.products);
            // RESPUESTA EN RELACION AL MANEJO DEL CARRITO
            return { status: 'succes', payload: result };
        }
        // Si no hay stock aviso
    } else {
        return {
            status: 'error',
            payload: `el producto ${pid} no existe en la base de datos o no hay stock`,
        };
    }
};

removeProductOfCart = async (pid, cid, quantity) => {
    // obtener datos del carrito
    const cartData = await cartReviewer(this.service, cid, pid);

    if (cartData.prodIndex != -1) {
        // si esta en el carrito que actualice
        const newQuantity = cartData.quantityOnCart + parseInt(quantity);

        if (newQuantity <= 0) {
            const response = await this.service.deleteOneProduct(pid, cid);
            return response;
        } else {
            const response = await this.service.updateExistingProductQuantity(pid, newQuantity);
            return response;
        }
    } else {
        // si no esta en el carrito que avise
        return { status: 'error', payload: 'producto no encontrado en el carrito' };
    }
};

class cartController {
    constructor() {
        this.service = cartService;
        this.productManager = productService;
        this.userManager = userService;
        this.ticketManager = ticketService;
    }
    purchase = async ({ purchaseList, purchaser, cid }) => {
        // Chequear stock
        const virtualProductList = await stockReviewer(this.productManager, purchaseList);
        // Calcular el precio total
        const totalAmount = amountCalculator(virtualProductList);
        // Obtener codigos existentes
        const codesArray = await this.ticketManager.getOneKeyData('code');
        // Genero el ticket
        const tiketData = {
            code: ticketCodeGenerator(codesArray, 5),
            purchase_datetime: timeGetter(),
            amount: totalAmount,
            purchaser,
        };
        console.log('check tiketData un purchase method of cart controller', tiketData);

        const response = await this.ticketManager.makeATicket(tiketData);

        // Actualizo el stock y el carrito
        virtualProductList.forEach((prod) => {
            this.productManager.productUpdate(prod.pid, { stock: prod.remainingStock });
            this.service.updateExistingProductQuantity(prod.pid, cid, prod.remainingForBuying);
        });
        return response;
    };

    tiketGetter = () => {};

    createCart = async () => {
        const response = await this.service.createCart();
        return response;
    };
    getOneCart = async (cid) => {
        const response = await this.service.getCartById(cid);
        return response;
    };

    deleteOneProduct = async (pid, cid) => {
        const virtualCart = await this.getCart(cid);
        const products = virtualCart.payload;

        productIndex = products.findIndex((productObjetc) => productObjetc.product._id.equals(pid));

        await uptadeStock(pid, products[productIndex].product.stock, products[productIndex].quantity);
        // Manejo de cart
        const response = await this.service.deleteProductById(pid, cid);

        // Respuesta
        return response;
    };
    updateCart = async (pid, cid, quantity) => {
        if (quantity > 0) {
            const response = addProductToCart(pid, cid, quantity);
            return response;
        } else {
            const response = removeProductOfCart(pid, cid, quantity);
            return response;
        }
    };

    emptyCart = async (cid) => {
        const response = await this.service.emptyCart(cid);
        return response;
    };

    deleteCart = async (cid) => {
        const response = await this.service.deleteCart(cid);
        return response;
    };
    cleanCartsWhitOutUser = async () => {
        try {
            // Recuperar todos los id de carritos de usuarios
            const cidsArray = await this.service.getAllKeyValues('_id');
            const userCids = await this.userManager.getAllKeyValues('cartId');
            const cartsWhitOutUserIds = cidsArray.filter((elemento) => !userCids.includes(elemento));
            cartsWhitOutUserIds.forEach((cid) => this.service.deleteCart(cid));
        } catch (error) {
            console.log('cleanCartsWhitOutUser of carts controller is catch', error);
        }
    };
}

module.exports = cartController;
