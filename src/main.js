const fs = require('fs');

// Biblioteca de funciones

const recuperarDatos = async (ruta) => {
    if (fs.existsSync(`${ruta}`)) {
        const productJson = await fs.promises.readFile(`${ruta}`, 'utf-8');
        return JSON.parse(productJson);
    } else {
        return [];
    }
};
const persistenciaDatos = async (ruta, variableObjeto) => {
    const nuevoArray = JSON.stringify(variableObjeto, null, 2);
    await fs.promises.writeFile(`${ruta}`, nuevoArray);
};

// CLASE CONSTRUCTORA
export class ProductManager {
    constructor(rutaDB) {
        this.products = [];
        this.path = rutaDB;
    }

    async getProducts() {
        // Variables de la funcion y recupero de datos
        const productArray = await recuperarDatos(this.path);

        // Actualización de datos
        productArray.length > 0 && (() => (this.products = productArray))();

        //Impresion en consola.
        console.log(`La lista de productos completa es ${JSON.stringify(productArray)}`);
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        // Variables de la funcion y recupero de datos
        const productArray = await recuperarDatos(this.path);

        // Actualización de datos
        productArray.length > 0 && (() => (this.products = productArray))();

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
        console.log ("aca arranca el Get Product By Id")

        // Variables de la funcion y recupero de datos
        const productArray = await recuperarDatos(this.path);

        // Actualización de datos
        productArray.length > 0 && (() => (this.products = productArray))();

        // Product Search
        const productFound = this.products.filter((producto) => producto.id == idDB);
        // aSearch set
        productFound.length > 0
            ? console.log(`El producto que solicito por id fue ${JSON.stringify(productFound)}`)
            : console.log('Not found');
    }

    async updateProductById(id, productoObjetc) {
        console.log('aca arranca el update Product By Id');
        // Variables de la funcion y recupero de datos
        const productArray = await recuperarDatos(this.path);

        // Actualización de datos
        productArray.length > 0 && (() => (this.products = productArray))();

        // Product Search
        const productSelect = this.products.findIndex((producto) => producto.id == id);

        // Search set
        productSelect != -1
            ? (async () => {
                console.log ("ingresa en el de actualizar")
                  /* funcion asincrona anonima para ejecutar si hay productSelect*/
                  this.products[productSelect] = { ...this.products[productSelect], ...productoObjetc };
                  await persistenciaDatos(this.path, this.products);
              })()
            : console.log('Not found');
    }

    async deletProductById(idDB) {
        console.log('aca arranca el delet Product By Id');
        // Variables de la funcion y recupero de datos
        const productArray = await recuperarDatos(this.path);

        // Actualización de datos
        productArray.length > 0 && (() => (this.products = productArray))();

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

// Creacion de instancia de clase productArray
export const productArray = new ProductManager('productosEnlistados.json');

// Código para prueba por consola de funcionalidades requeridas.
export async function controler() {
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

    productArray.deletProductById (1)
    console.log(productArray.products); /* Borrado de un elemento por id*/
}
controler();
