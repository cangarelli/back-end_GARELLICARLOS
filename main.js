// CLASE CONSTRUCTORA
class ProductManager {
    constructor () {
        this.products = []
        this.paht = rutaDB
    }

    async getProducts (){
        // Variables de la funcion 
        const productArray = []

        //Recupero de datos
        if (fs.existsSync(rutaDB)) {
            const productJson = await fs.promise.readFile(this.paht, "utf-8");
            productArray = parse(productJson);
        }

        // Actualizacion de datos.
        productArray == this.products ?
        console.log ("los datos estan iguales")
        : () => {
            console.log ("los datos son distintos. Los datos de la ram seran igualados a los de la base de datos");
            this.products = productArray;
        }

        //Impresion en consola.
        console.log (`La lista de productos completa es ${JSON.stringify(this.products)}`)
    }

    async addProduct ({title, description, price, thumbnail, code, stock}) {
        // Variables de la funcion 
        const productArray = []

        //Recupero de datos
        if (fs.existsSync(rutaDB)) {
            const productJson = await fs.promise.readFile(this.paht, "utf-8");
            productArray = parse(productJson);
        }
        
        // Actualización de datos
        productArray == this.products ?
        console.log ("los datos estan iguales")
        : () => {
            console.log ("los datos son distintos. Los datos de la ram seran igualados a los de la base de datos");
            this.products = productArray;
        }

        // code check
        const exist = this.products.filter ((producto) => producto.code == code)
        // id check
        const idlog = this.products.reduce ((idMax, producto) => Math.max(idMax, producto.id), 0)
       // Product set
        exist.length > 0 ? 
            console.log ("El code ingresado ya se encuentra en la base de datos") 
            : async () => { /* funcion asyncronica anonima que agrega nuevo producto al array*/
                this.products.push ({title, description, price, thumbnail, code, stock, id: idlog + 1/*seteo id*/})
                nuevoArray = stringify (this.products)
                await fs.promise.writeFile (rutaDB, nuevoArray)
            }
    }
    async getProductById (idDB){
        // Variables de la funcion 
        const productArray = []

        //Recupero de datos
        if (fs.existsSync(rutaDB)) {
            const productJson = await fs.promise.readFile(this.paht, "utf-8");
            productArray = parse(productJson);
        }
        
        // Actualización de datos
        productArray == this.products ?
        console.log ("los datos estan iguales")
        : () => {
            console.log ("los datos son distintos. Los datos de la ram seran igualados a los de la base de datos");
            this.products = productArray;
        }
        // Product Search
        const productFound = this.products.filter ((producto) => producto.id == idDB);
       // aSearch set
        productFound.length > 0 ? 
            console.log (`El producto que solicito por id fue ${JSON.stringify(productFound)}`)
            : console.log ("Not found");
    }

    async updateProductById (id, productoObjetc){
        // Variables de la funcion 
        const productArray = []

        //Recupero de datos
        if (fs.existsSync(rutaDB)) {
            const productJson = await fs.promise.readFile(this.paht, "utf-8");
            productArray = parse(productJson);
        }
        
        // Actualización de datos
        productArray == this.products ?
        console.log ("los datos estan iguales")
        : () => {
            console.log ("los datos son distintos. Los datos de la ram seran igualados a los de la base de datos");
            this.products = productArray;
        }

        // Product Search
       const productSelect = this.products.findIndex ((producto) => producto.id == id)
       // Search set
       productSelect.length > 0 ? 
            async () => { /* funcion asincrona anonima para ejecutar si hay productSelect*/
            this.products[productSelect] = {...this.products[productSelect], ...productoObjetc}
            await fs.promise.writeFile(rutaDB, this.products)
            }
            : console.log ("Not found");
    }
    
    async deletProductById (idDB) {
        // Variables de la funcion 
        const productArray = []

        //Recupero de datos
        if (fs.existsSync(rutaDB)) {
            const productJson = await fs.promise.readFile(this.paht, "utf-8");
            productArray = parse(productJson);
        }
        
        // Actualización de datos
        productArray == this.products ?
        console.log ("los datos estan iguales")
        : () => {
            console.log ("los datos son distintos. Los datos de la ram seran igualados a los de la base de datos");
            this.products = productArray;
        }

        // Product Search
       const productSelect = this.products.findIndex ((producto) => producto.id == idDB)
       // Search set
       productSelect.length > 0 ? 
            async () => { /* funcion asincrona anonima para ejecutar si hay productSelect*/
            this.products.slice(productSelect)
            await fs.promise.writeFile(rutaDB, this.products)
            }
            : console.log ("Not found product you want to delete");
    }

}

// Creacion de instancia de clase productArray
const productArray = new ProductManager ("./productosEnlistados.json");

// Código para prueba por consola de funcionalidades requeridas.
