const  { Router } = require ("express")
// Modulos para que interprete el body del request
const bodyParser = require('body-parser');

const { validateToken, json_private_key } = require("../helpers/jwt")
const jwt = require ("jsonwebtoken")
class CustomRouter {
    constructor(){
        this.routes = Router ()
        this.init() //Ejecuta automaticamente el metodo al instanciar la clase
    }
    getRouter(){
        this.routes.use(bodyParser.urlencoded({ extended: false }));
        this.routes.use(bodyParser.json());
        return this.routes
    }   

    init(){} // Metodo a completar en clase hija para agregar setear rutas.

    generateCustomResponses = (req, res, next) =>{
        res.sendSuccess = (payload) => res.send({status: "success", payload})
        res.sendServerError = (error) => res.status(500).send({status: "error", error})
        res.sendUserError = (error) => res.status(400).send({status: "error", error})
        next()
    }
    // politics = ["public", "user", "user_premium", "admin"]
    handdlePolitics = (politics) => (req, res, next) =>  {
        if (politics[0] == "public") return next()
        const authHeaders = req.headers.authorization
        if(!authHeaders) return res.status(401).send({status: "error", error: "Unauthorized"})
        const token = authHeaders.split(" ")[1]
    
        let user =  jwt.verify (token, json_private_key)
        if (!politics.includes(user.role.toLowerCase())) return res.status(400).send({status: "error", error: "algo malo paso"})
        req.user = user
        next()
    }



    // Metodo para ejecutar nuestros callbacks [middleware, (req, res) => {}]
    applyCallBacks(callbacksarray){
        return callbacksarray.map ((callback) => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log (error)
                params[1].status(500).send(error)
            }
        })
    }
    get(path, politics, ...callbacks){
        this.routes.get(path, this.generateCustomResponses, this.handdlePolitics(politics), this.generateCustomResponses, this.applyCallBacks(callbacks))
    }
    post(path, ...callbacks){
        this.routes.post(path, this.generateCustomResponses, this.applyCallBacks(callbacks))
    }
    put(path, ...callbacks){
        this.routes.put(path, this.generateCustomResponses, this.applyCallBacks(callbacks))
    }
    delete(path, ...callbacks){
        this.routes.delete(path, this.generateCustomResponses, this.applyCallBacks(callbacks))
    }
}
module.exports = CustomRouter