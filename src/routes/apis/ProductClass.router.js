const productController = require("../../controller/products.controller");
const CustomRouter = require("./Routes");

const productManager = new productController()

class productClassRouter extends CustomRouter {
    init (){

        //seteo de rutas
        this.get("/", ["public"], async (req, res) =>{
            try {
                let {category, disponibility, order, limit, onPage} = req.query
                const response = await productManager.getProducts({category, disponibility, order, limit, onPage})               
                
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)
            } catch (error) {
                console.log ("check error of productClassRouter class router is get method", error)
                return res.sendServerError(`${error}`)
            }
        })
        this.get("/daokeydata/:key", async (req, res) =>{
            try {
                const keyData = await productManager.getSelectiveData(req.params.key)
                return keyData.status == "error" ?
                    res.sendUserError(keyData)
                :
                    res.sendSuccess(keyData)
                } catch (error) {
                    console.log ("check error of x class router is post method", error)
                    return res.sendServerError(`${error}`)
                }
            })
        router.get ("/:pid", async (req, res) => {
            try {
                const response = await productManager.getProduct(req.parms.pid)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)  
            } catch (error) {
                console.log ("check error of productClassRouter class router is post method", error)
                return res.sendServerError(`${error}`)
            }
        })
        this.post("/", async (req, res) =>{
            try {
                const response = await productManager.createProduct(req.body)
                return response.status == "error" ?
                    res.sendUserError(response.payload)
                :
                    res.sendSuccess(response.payload)
            } catch (error) {
                console.log ("check error of productClassRouter class router is post method", error)
                return res.sendServerError(`${error}`)
            }
        })
        this.put("/:pid", async (req, res) =>{
            try {
                const response = await productManager.updateProduct(req.params.pid, req.body) 

                return response.status == "error" ?
                    sendUserError(response.payload)
                :
                    sendSuccess(response.payload)
                
            } catch (error) {
                console.log ("check error of productClassRouter class router is put method", error)
                return res.sendServerError(`${error}`)
            }
        })
        this.delete("/:pid", async (req, res) =>{
            try {
                const response = await productManager.deleteProduct(req.params.pid) 

                return response.status == "error" ?
                    sendUserError(response.payload)
                :
                    sendSuccess(response.payload)
            } catch (error) {
                console.log ("check error of x class router is delete method", error)
                return res.sendServerError(`${error}`)
            }
        })
    }
}
module.exports = productClassRouter