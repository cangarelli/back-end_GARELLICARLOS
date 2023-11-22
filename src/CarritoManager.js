//Modulos nativos importados
const fs = require('fs');
import { recuperarDatos, persistenciaDatos } from './helpers/helpersBarrel';

// CLASE CONSTRUCTORA
class CarritoManager {
    static contador = 0;
    id;

    constructor(rutaDB) {
        CarritoManager.contador++;
        this.id = CarritoManager.contador;

        this.products = [];
        this.path = rutaDB;
    }

    async getProducts() {
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

        // Search set
        if (this.products.length > 0) {
            console.log(`La lista de productos completa es${JSON.stringify(this.products)}`);
            return this.products;
        } else {
            console.log('No hay productos registrados');
            return { error: 'No agrego ninungun producto al carrito.' };
        }
    }

    async addProductById(DBP, id, cantidad) {
        // Recupero de datos del carrito en carrito virtual
        this.products = await recuperarDatos(this.path);

        // Recupero de producto a cargar.
        const productSelect = await DBP.getProductById(id);

        // stock check
        const hayStock = productSelect.stock >= cantidad;
        console.log(hayStock);
        hayStock ? console.log('Cantidad disponible') : console.log('cantidad no disponible');

        // carrito check
        const existIndex = this.products.findIndex((producto) => productSelect.id == this.products.id);

        // Product set
        if (hayStock) {
            // Actualización de carrito virtual
            existIndex != -1
                ? (() => (this.product[existIndex].cantidad += cantidad))()
                : (() => {
                      this.products.push(productSelect);
                      this.product.cantidad = cantidad;
                      this.product.delete(stock);
                  })();

            // Actualización de stock en DB
            productSelect.stock -= cantidad;
            productSelect.delete(id);
            await DBP.updateProductById(id, productSelect);

            // Actualización de carrito DB
            await persistenciaDatos(this.path, this.products);
        } else {
            console.log(`Revise la cantidad de ${productSelect.title} que quiere comprar.`);
        }
    }
    async getProductById(idDB) {
        // Variables de la funcion y recupero de datos
        const productArray = await recuperarDatos(this.path);

        // Actualización de datos
        productArray.length > 0 && (() => (this.products = productArray))();

        // Product Search
        const productFound = this.products.filter((producto) => producto.id == idDB);
        // Search set
        if (productFound.length > 0) {
            console.log(`El producto que solicito por id fue ${JSON.stringify(productFound)}`);
            return productFound;
        } else {
            console.log('Not found');
            return 'Not found';
        }
    }

    async updateProductById(id, productoObjetc, DBP) {
        console.log('aca arranca el update Product By Id');
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

        // Product Search
        const productSelect = this.products.findIndex((producto) => producto.id == id);

        // Search set
        productSelect != -1
            ? (async () => {
                  console.log('ingresa en el de actualizar');
                  /* funcion asincrona anonima para ejecutar si hay productSelect*/
                  this.products[productSelect] = { ...this.products[productSelect], ...productoObjetc };
                  await persistenciaDatos(this.path, this.products);
              })()
            : console.log('Not found');
    }

    async deletProductById(idDB, DBP) {
        console.log('aca arranca el delet Product By Id');
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

        // Product Search
        const productSelect = this.products.findIndex((producto) => producto.id == idDB);
        // Search set
        productSelect != -1
            ? (async () => {
                  /* funcion asincrona anonima para ejecutar si hay productSelect*/
                  this.products.splice(productSelect, 1);
                  await persistenciaDatos(this.path, this.products);
              })()
            : console.log('Not found product you want to delete');
    }
}
module.exports = CarritoManager;
