//Modulos nativos importados
const fs = require('fs');
import { recuperarDatos, persistenciaDatos } from './helpers/helpersBarrel';

// CLASE CONSTRUCTORA
class ProductManager {
    static contador = 0;
    id;

    constructor(rutaDB) {
        ProductManager.contador++;
        this.id = ProductManager.contador;

        this.products = [];
        this.path = rutaDB;
    }

    async getProducts() {
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

        // Search set
        if (productArray.length > 0) {
            console.log(`La lista de productos completa es${JSON.stringify(this.products)}`);
            return this.products;
        } else {
            console.log('No hay productos registrados');
            return { error: 'El producto solicitado no existe' };
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        // Variables de la funcion y recupero de datos
        this.products = await recuperarDatos(this.path);

        // code check
        const exist = this.products.filter((producto) => producto.code == code);
        // id check
        const idlog = this.products.reduce((idMax, producto) => Math.max(idMax, producto.id), 0);
        // Product set
        exist.length > 0
            ? console.log('El code ingresado ya se encuentra en la base de datos')
            : (async () => {
                  /* funcion asyncronica anonima que agrega nuevo producto al array*/
                  this.products.push({
                      title,
                      description,
                      price,
                      thumbnail,
                      code,
                      stock,
                      id: idlog + 1 /*seteo id*/,
                  });
                  await persistenciaDatos(this.path, this.products);
              })();
    }
    async getProductById(idDB) {
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

    async updateProductById(id, productoObjetc) {
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

    async deletProductById(idDB) {
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
module.exports = ProductManager;

// Creacion de instancia de clase productArray
// const productArray= new  ProductManager('src/productsDB.json');

/* funciones para la generación de la DB

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
            stock: `10`,
        });
 
    }
}
generarDB (10)
*/

// Código para prueba por consola de funcionalidades requeridas. Entegable 2
async function controler() {
    await productArray.addProduct({
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25,
    });
    console.log(productArray.products); /* Agregado de productos con objeto indicado */

    await productArray.addProduct({
        title: 'producto prueba 2',
        description: 'Este es un producto prueba',
        price: 301,
        thumbnail: 'Sin imagen',
        code: 'def456',
        stock: 25,
    });

    await productArray.getProducts(); /* Obtener lista de productos completa */

    await productArray.getProductById(1); /* Obtener lista de producto seleccionado por id*/

    await productArray.addProduct({
        title: 'producto prueba 2',
        description: 'Este es un producto prueba',
        price: 301,
        thumbnail: 'Sin imagen',
        code: 'def456',
        stock: 25,
    }); /* control de que no se repita el code*/

    await productArray.updateProductById(1, {
        title: 'producto prueba - actualización',
        description: 'Este es un producto prueba de actualización',
        price: 5001,
        thumbnail: 'Con imagen',
    });
    console.log(productArray.products); /*actualización de this.products */

    productArray.deletProductById(1);
    console.log(productArray.products); /* Borrado de un elemento por id*/
}
