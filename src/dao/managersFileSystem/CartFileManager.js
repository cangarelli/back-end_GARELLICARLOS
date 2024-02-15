//Modulos nativos importados
const fs = require('fs');
const recuperarDatos = require('./fileManagers/recuperarDatos');
const persistenciaDatos = require('./fileManagers/persistenciaDatos');

// CLASE CONSTRUCTORA
class CartManager {
    static contador = 0;
    id;

    constructor() {
        this.carts = [];
        this.path = 'src/DB-files/carrito.json';
    }

    async createCart() {
        // Variables de la funcion y recupero de datos
        this.carts = await recuperarDatos(this.path);

        const idlog = this.carts.reduce((idMax, cart) => Math.max(idMax, cart.id), 0);
        const newCart = { id: idlog + 1, products: [] };

        this.carts.push(newCart);
        await persistenciaDatos(this.path, this.carts);
        return true;
    }

    async getCartById(cid) {
        // Variables de la funcion y recupero de datos
        this.carts = await recuperarDatos(this.path);

        // Cart Search
        const cartFound = this.carts.findIndex((cart) => cart.id == cid);

        // Search set
        if (cartFound != -1) {
            console.log(
                `El producto que solicito por id fue ${JSON.stringify(this.carts[cartFound].products)}`
            );
            return this.carts[cartFound].products;
        } else {
            console.log('Not found');
            return 'Not found';
        }
    }

    async updateExistingProductQuantity (pid, quantity) {
        return ("working on it")
    }

    async addNewProduct (cid, products){
       // Recupero de datos del carrito en carrito virtual
       this.carts = await recuperarDatos(this.path);
       //
       const cartIndex = this.carts.findIndex((cart) => parseInt(cid) === cart.id);

       // Product set
       if (cartIndex != -1) {
           const cart = this.carts[cartIndex].products;
           if (cart.length > 0) {
               const productIndex = cart.findIndex((product) => parseInt(pid) === parseInt(product.id));
               if (productIndex != -1) {
                   cart[productIndex].quantity++;
               } else {
                   cart.push({ id: parseInt(pid), quantity: 1 });
               }
               this.carts[cartIndex].products = cart;
           } else {
               cart.push({ id: parseInt(pid), quantity: 1 });
               this.carts[cartIndex].products = cart;
           }
           await persistenciaDatos(this.path, this.carts);
           return true;
       } else {
           return false;
       }    
    }

    async deleteCart (cid) {
        return ("working on it")
    }
    
    async removeProductById(DBP, id, cantidad) {
        // Recupero de datos del carrito en carrito virtual
        this.products = await recuperarDatos(this.path);

        // carrito check
        const existIndex = this.products.findIndex((producto) => productSelect.id == this.products.id);

        // Actualización de carrito virtual
        existIndex != -1
            ? (async () => {
                  //Si se quitan todos los que hay en el carrito lo borra, sino saca solo la cantidad que se le indica
                  this.product[existIndex].cantidad == cantidad
                      ? this.product.splice([existIndex], 1)
                      : (this.product[existIndex].cantidad -= cantidad);
                  // Actualiza carrito
                  await persistenciaDatos(this.path, this.products);
                  // Actualiza stock
                  await DBP.updateProductById(id, { stock: stock + cantidad });
              })()
            : (() => {
                  console.log('Not found');
                  return 'Este producto no esta en el carrito';
              })();
    }

    getAllKeyValues = async (key) => "woroking on it"
}
module.exports = CartManager;
