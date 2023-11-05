// CLASE CONSTRUCTORA
class ProductManager {
    constructor () {
        this.products = []
    }
    getProducts (){
        console.log (`La lista de productos completa es ${JSON.stringify(this.products)}`)
    }
    addProduct ({title, description, price, thumbnail, code, stock}) {
        // code check
        const exist = this.products.filter ((producto) => producto.code == code)
        // id check
        const idlog = this.products.reduce ((idMax, producto) => Math.max(idMax, producto.id), 0)
       // Product set
        exist.length > 0 ? 
            console.log ("El code ingresado ya se encuentra en la base de datos") 
            : this.products.push ({title, description, price, thumbnail, code, stock, id: idlog + 1/*seteo id*/})
    }
    getProductById (idDB){
        // Product Search
        const productFound = this.products.filter ((producto) => producto.id == idDB)
       // Search set
        productFound.length > 0 ? 
            console.log (`El producto que solicito por id fue ${JSON.stringify(productFound)}`) 
            : console.log ("Not found");
    }
}

// Creacion de instancia de clase productArray
const productArray = new ProductManager ();

// Código para prueba por consola de funcionalidades requeridas.

console.log (productArray); /* Creacion de la instancia vacia []*/

productArray.addProduct (
{title: "producto prueba", 
description: "Este es un producto prueba", 
price: 200, 
thumbnail: "Sin imagen",
code: "abc123",
stock: 25}
);
console.log (productArray); /* Agruegado de productos con objeto indicado */


productArray.addProduct (
    {title: "producto prueba 2", 
    description: "Este es un producto prueba", 
    price: 301, 
    thumbnail: "Sin imagen",
    code: "def456",
    stock: 25}
);

productArray.getProducts(); /* Obtener lista de productos completa */

productArray.getProductById(2); /* Obtener lista de producto seleccionado por id*/

productArray.addProduct (
    {title: "producto prueba 2", 
    description: "Este es un producto prueba", 
    price: 301, 
    thumbnail: "Sin imagen",
    code: "def456",
    stock: 25}
); /* control de que no se repita el code*/