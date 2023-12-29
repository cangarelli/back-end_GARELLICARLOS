// Importación de modulos nativos
    const { Router } = require('express');
    const router = Router();

// Modulos para que interprete el body del request
    const bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());

// Importaciones de modulos propios
    const ProductManager = require('../../dao/managers/ProductManager.js');
    const { uploader } = require('../../helpers/uploader.js');
    const ProductMongoManager = require('../../dao/managersMongo/ProductMongoManager.js');
    const paginateQueryMaker = require('../../helpers/paginateQueryMaker.js');
    const { paginateSubDocs } = require('mongoose-paginate-v2');
    const linkQueryMaker = require('../../helpers/linkQueryMaker.js');

//Creacion de array de productos
    const productArray = new ProductManager();
    const mongoProductManager = new ProductMongoManager();

// Configuración de rutas
// DATA MANAGERS MONGOOSE

/* TRAER TODOS LOS PRODUCTOS -->  AGREGAR CONDICIONALES DE PARAMS */
router.get ("/mongo", async (req, res) => {
    let {category, disponibility, order, limit, onPage} = req.query
    limit = limit || 3 
    try {
        const result = await mongoProductManager.getProducts({category: category, disponibility: disponibility, order: order, limit: limit, onPage: onPage})
        console.log ("check result", result)
        const {
            docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage
        } = result 
        console.log ("check Page", nextPage, prevPage)
        const nextLink = `/api/products/mongo${linkQueryMaker(
            {category: category, disponibility: disponibility, order: order, limit: limit, thePage: nextPage}
            )})`
            const prevLink = `/api/products/mongo${linkQueryMaker(
                {category: category, disponibility: disponibility, order: order, limit: limit, thePage: prevPage}
                )})`
        console.log (prevLink, nextLink)
        console.log ("check docs of product.router", docs)
        
        return res.send({
            status:"success",
            docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: prevLink,
            nextLink: nextLink 
        })
    } catch (error) {
        console.log (error)
        return res.send({
            status:"error",
            payload: error,
        })
    }

})
/* TRAER UN PRODUCTO SELECCIONADO -----------------------------> OK*/
router.get ("/mongo/:pid", async (req, res) => {
    try {
        const response = await mongoProductManager.getProductsById(req.params.pid)
        return res.send(response)
    } catch (error) {
        console.log (error)
    }

})
/* ACTUALIZAR LISTA DE PRODCTOS -------------------------------> OK*/
router.post ("/mongo", async (req, res) => {
    const response = await mongoProductManager.createProduct(req.body)
    return res.send(response)
})
/* CARGADO DE FILE DB EN MONGO DB
router.post ("/armado", async (req, res) => {
    let listObjetcs = await productArray.getProducts();
    listObjetcs.forEach(async (product) => {
        delete product.id
        console.log (product)
        const result = await productsModel.create(product)  
    })
    console.log ("datos cargados?")

    return res.status(200).send({ status: 'succes', payload: listObjetcs });
})*/

/* ACTUALIZAR UN SOLO PRODUCTO DE LA LISTA --------------------> OK*/
router.put ("/mongo/:pid/", async (req, res) => {
  const responseAdd = await mongoProductManager.updateProduct(req.params.pid, req.body)
  return res.send(responseAdd)
})
/* BORRAR UN SOLO PRODUCTO DE LA LISTA ------------------------> OK*/
router.delete ("/mongo/:pid", async (req, res) => {
    const response = await mongoProductManager.deleteProduct(req.params.pid)
    return res.send(response)
})







    /* DATA MANAGERS FILE FS
// -------------------------------------- GET
router.get('/', async (req, res) => {
    // recupero de variables dinamicas
    const limit = req.query.limit;
    // Recupero de datos
    let listObjetcs = await productArray.getProducts();

    // Lógica
    limit != undefined
        ? (listObjetcs = listObjetcs.slice(0, limit))
        : console.log('La lista de productos va completa');

    // Envio de datos
    if (listObjetcs.length > 0) {
        return res.status(200).send({ status: 'succes', payload: listObjetcs });
    } else {
        console.log('No hay productos registrados');
        return res.status(200).send({ status: 'error', mesagge: 'No hay productos registrados' });
    }
});
router.get('/:pid', async (req, res) => {
    // recupero de vari0ables dinamicas
    const id = req.params.pid;

    // Recupero de datos
    const busqueda = await productArray.getProductById(id);

    // Envio de datos
    if (busqueda == 'Not found') {
        return res.status(200).send({ error: 'El producto solicitado no existe' });
    } else {
        return res.status(200).send({ status: 'succes', payload: busqueda });
    }
});
//-------------------------------------- POST
router.post('/', async (req, res) => {
    // Proximamente Multer
    //datos del body.
    const postData = req.body

    // Utiliza el middleware de Multer 
    await uploader.single('image')(req, res, async (err) => {
        if (err) {
            console.error('Error al cargar el archivo:', err);
            return;
        }
    });
    // Agrega la ruta del archivo junto con el nombre al objeto info
    const filePath = `${req.file.path}/${req.file.filename}`;
    

    // SETEO DE PRODUCTO
    const agrega = await productArray.addProduct(req.body);
    // Respuesta de servidor
    if (agrega) {
        return res.status(200).send({ status: 'succes', payload: `Producto cargado` });
    } else {
        return res
            .status(200)
            .send({ status: 'error', payload: `El producto no se pudo cargar, revise los datos.` });
    }
});
//--------------------------------------- PUT
router.put('/:pid', async (req, res) => {
    // Operaciones con base de datos
    const productData = req.body;
    const actualiza = await productArray.updateProductById(req.params.pid, productData);

    // Respuesta
    if (actualiza) {
        return res
            .status(200)
            .send({ status: 'succes', payload: `El producto ${req.params.pid} fue actualizado` });
    } else {
        return res.status(200).send({
            status: 'error',
            payload: `El producto ${req.params.pid} no se pudo actualizar, revise los datos.`,
        });
    }
});
// -------------------------------------- DELETE
router.delete('/:pid', async (req, res) => {
    // Llamado al método y realización de actividad.
    const borra = await productArray.deletProductById(req.params.pid);

    // Respuesta
    borra === true
        ? res.status(200).send({ status: 'succes', payload: 'Producto eliminado de la lista de productos' })
        : res
              .status(200)
              .send({ status: 'error', payload: 'No se encuentra el producto que desea eliminar' });
});
*/

// exportación de rutas como modulo
module.exports = router;
