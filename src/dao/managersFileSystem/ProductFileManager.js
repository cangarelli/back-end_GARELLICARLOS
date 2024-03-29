//Modulos nativos importados
const fs = require('fs');
const recuperarDatos = require('./fileManagers/recuperarDatos');
const persistenciaDatos = require('./fileManagers/persistenciaDatos');
// import { recuperarDatos, persistenciaDatos } from '../helpers/helpersBarrel';

// CLASE CONSTRUCTORA
class ProductManager {
    static contador = 0;
    id;

    constructor() {
        this.products = [];
        this.path = 'src/DB-files/products.json';
    }

    async getProducts({ filter, pagination }) {
        // OK SIN PAGINATION
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

        // Search set
        if (this.products.length > 0) {
            return this.products;
        } else {
            console.log('No hay productos registrados');
            return { error: 'El producto solicitado no existe' };
        }
    }
    async getOneKeyData(key) {
        return 'working on it';
    }
    async productCreate({ title, price, category, description, stock, code, thumbnail, status }) {
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);
        // code check
        const exist = this.products.filter((producto) => producto.code == code);
        // id check
        const idlog = this.products.reduce((idMax, producto) => Math.max(idMax, producto.id), 0);
        // Product set
        return new Promise(async (resolve, reject) => {
            exist.length > 0
                ? (() => {
                      console.log('El code ingresado ya se encuentra en la base de datos');
                      resolve('El code ingresado ya se encuentra en la base de datos');
                  })()
                : (async () => {
                      /* funcion asyncronica anonima que agrega nuevo producto al array*/
                      this.products.push({
                          title,
                          description,
                          price,
                          thumbnail,
                          code,
                          stock,
                          status: true,
                          id: idlog + 1 /*seteo id*/,
                      });
                      await persistenciaDatos(this.path, this.products);
                      resolve(true);
                  })();
        });
    }

    async getProductsById(idDB) {
        // OK
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

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

    async productUpdate(id, productoObjetc) {
        // OK
        console.log('aca arranca el update Product By Id');
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

        // Product Search
        const productSelect = this.products.findIndex((producto) => producto.id == id);
        return new Promise((resolve, reject) => {
            // Search set
            if (productSelect != -1) {
                (async () => {
                    console.log('ingresa en el de actualizar');
                    /* funcion asincrona anonima para ejecutar si hay productSelect*/
                    this.products[productSelect] = {
                        ...this.products[productSelect],
                        ...productoObjetc,
                    };
                    await persistenciaDatos(this.path, this.products);
                    resolve(true);
                })();
            } else {
                console.log('Not found');
                resolve(false);
            }
        });
    }

    async productDelete(idDB) {
        // OK
        console.log('aca arranca el delet Product By Id');
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

        // Product Search
        const productSelect = this.products.findIndex((producto) => producto.id == idDB);
        // Search set
        if (productSelect != -1) {
            this.products.splice(productSelect, 1);
            await persistenciaDatos(this.path, this.products);
            return true;
        } else {
            console.log('Not found product you want to delete');
            return false;
        }
    }
}
module.exports = ProductManager;

/* funciones para la generación de la DB
const productArray = new ProductManager();

async function generarDB(cantidad) { 

    const titulo = [
        'jean',
        'pc',
        'robot',
        'remera',
        'botines',
        'peluca',
        'buzo',
        'camisa',
        'teclado',
        'mouse',
    ];
    const descripcion = [
        'azul marino',
        'i8 y 30TB',
        'hace la limpieza del hogar',
        'muy linda',
        'firmados por gallardo',
        'estilo libertario',
        'abrigadito',
        'de oficina cool',
        'casi escribe por dictado',
        'gamer 700',
    ];
    for (let i = 0; i < cantidad; i++) {
        console.log (`entre al ciclo for ${i}`)
        await productArray.addProduct({
            title: `${titulo[i]}`,
            description: `${descripcion[i]}`,
            price: Number(titulo[i].length*800),
            thumbnail: 'sin imagen',
            code: `AW${descripcion[i].length}${titulo[i].length}vevo`,
            stock: 10,
        });
 
    }
}
generarDB (10)
*/
