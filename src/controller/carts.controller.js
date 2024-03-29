const { log } = require('winston');
const {
    ticketCodeGenerator,
    timeGetter,
    amountCalculator,
    cartReviewer,
    stockReviewer,
    logger,
} = require('../helpers/helpersBarrel.js');
const { productService, cartService, userService, ticketService } = require('../repositories/service.js');

// const addProductToCart = async ({pid, cid, quantity, pManager, cManager}) => {
//     const sellerData = await stockReviewer(pManager, [{ prod: pid, quantity }]);

//     // Chequeo si hay stock del producto.
//     if (sellerData.quantity > 0) {
//         const virtualCart = await serviceManager.getCartById(cid);
//         const cartData = await cartReviewer(cManager, cid, pid);

//         // Si ya hay en el carrito agrego 1 al paquete
//         if (cartData.prodIndex != -1) {
//             // Manejo de cantidades en carrtio
//             const fullRequest = cartData.quantityOnCart + parseInt(quantity);
//             const newSellerData = await stockReviewer(pManager, [{ prod: pid, fullRequest }]);
//             const result = cManager.updateExistingProductQuantity(pid, newSellerData.quantity);
//             // RESPUESTA EN RELACION AL MANEJO DEL CARRITO
//             return { status: 'succes', payload: result };
//             // Si no hay agrego uno creando el paquete
//         } else {
//             // Manejo de cantidades en carrtio
//             cartData.products.push({ product: pid, quantity: parseInt(quantity) });
//             const result = await cManager.addNewProduct(cid, cartData.products);
//             // RESPUESTA EN RELACION AL MANEJO DEL CARRITO
//             return { status: 'succes', payload: result };
//         }
//         // Si no hay stock aviso
//     } else {
//         return {
//             status: 'error',
//             payload: `el producto ${pid} no existe en la base de datos o no hay stock`,
//         };
//     }
// };

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
        logger.Debug('check tiketData un purchase method of cart controller', tiketData);

        const response = await this.ticketManager.makeATicket(tiketData);

        // Actualizo el stock y el carrito
        virtualProductList.forEach((prod) => {
            this.productManager.productUpdate(prod.pid, { stock: prod.remainingStock });
            this.service.updateExistingProductQuantity(prod.pid, cid, prod.remainingForBuying);
        });
        return response;
    };

    tiketGetter = () => {};

    getQuantity = async (cid) => {
        const response = await this.service.getCartById(cid);
        console.log('Check response of cart controller is get Quantity method', response);
        let quantity;
        if (response && response > 0) {
            quantity = response.reduce((acc, product) => {
                acc + product.quantity, 0;
            });
            console.log('Check quantity of cart controller is get Quantity method', quantity);
        } else {
            quantity = 0;
        }

        return quantity;
    };

    createCart = async () => {
        const response = await this.service.createCart();
        return response;
    };

    getOneCart = async (cid) => {
        const response = await this.service.getCartById(cid);
        return response;
    };

    deleteOneProduct = async (pid, cid) => await this.service.removeProductFromCart(cid, pid);

    addProductToCart = async ({ pid, cid, quantity }) => {
        const sellerData = await stockReviewer(this.productManager, [{ prod: pid, quantity }]);
        logger.Debug('check seller data in addProductToCart of cart controller', sellerData);
        for await (const prod of sellerData) {
            // Chequeo si hay stock del producto.
            if (prod && prod.quantity > 0) {
                const virtualCart = await this.service.getCartById(cid);

                const cartData = await cartReviewer(virtualCart, pid, cid);
                logger.Debug('check cart data in addProductToCart of cart controller', cartData);
                // Si ya hay en el carrito agrego 1 al paquete
                if (cartData.prodIndex != -1) {
                    // Manejo de cantidades en carrtio
                    const fullRequest = cartData.quantityOnCart + parseInt(quantity);
                    const newSellerData = await stockReviewer(this.productManager, [
                        { prod: pid, quantity: fullRequest },
                    ]);
                    logger.Debug(
                        'check new Seller Data in addProductToCart of cart controller',
                        newSellerData
                    );
                    const result = await this.service.updateExistingProductQuantity(
                        pid,
                        cid,
                        newSellerData[0].quantity
                    );

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
        }
    };
    removeProductOfCart = async ({ pid, cid, quantity }) => {
        // obtener datos del carrito
        const virtualCart = await this.service.getCartById(cid);
        const cartData = await cartReviewer(virtualCart, pid, cid);

        if (cartData.prodIndex != -1) {
            // si esta en el carrito que actualice
            const newQuantity = cartData.quantityOnCart + parseInt(quantity);
            if (newQuantity <= 0) {
                const response = await this.service.deleteOneProduct(pid, cid);
                return response;
            } else {
                const response = await this.service.updateExistingProductQuantity(pid, cid, newQuantity);
                return response;
            }
        } else {
            // si no esta en el carrito que avise
            return { status: 'error', payload: 'producto no encontrado en el carrito' };
        }
    };
    updateCart = async (pid, cid, quantity) => {
        console.log('Check params in updateCart', pid, cid, quantity);
        if (quantity > 0) {
            const response = this.addProductToCart({ pid: pid, cid: cid, quantity: quantity });
            return response;
        } else {
            const response = this.removeProductOfCart({
                pid,
                cid,
                quantity,
            });
            return response;
        }
    };

    emptyCart = async (cid) => {
        const response = await this.service.emptyCart(cid);
        console.log('chek response of empty cart controller', response);
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
            logger.Fatal('cleanCartsWhitOutUser of carts controller is catch', error);
        }
    };
}

module.exports = cartController;
