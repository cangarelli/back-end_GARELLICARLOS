const userGetterDto = require("../dto/userGetterDto.js");
const { passwordValidator } = require("../helpers/hashPasswordManager")
const { userService, cartService } = require ("../repositories/service.js")

// Helpers del controller
const emptyFieldDetector = (object) =>{
    let emptyFields = []
    for (const key in object) {
        if (object[key] == undefined || object[key] == null ) {
            emptyFields.push (key);  
        }
    }
    const emptyFieldsStrings = emptyFields.join(", ") 
    return emptyFields
}

const filterCleanStrings = (object) =>{
    let reviewObject = {}
    for (const key in object) {
        // console.log("check filterCleanStrings ")
        if (object[key].length < 1) {
            reviewObject[key] = undefined
        } else {
            reviewObject[key] = object[key] 
        }
    }
    return reviewObject
}

class userController{
    constructor(){
        this.service = userService
        this.cartManager = cartService
    }
    
    getUser = async (uid) => {
        let response
        // Seleccion de metodo a usar
        if (uid.includes("@")) {
            response = await this.service.userSearchByEmail(uid.trimEnd())    
        } else {
            response = await this.service.userSearch(uid.trimEnd())
        }
        // Gestion de respuesta
        if (response == null) {
            return ({status: "error", payload: "usuario no encontrado"})
        } else {
            return (response)
        }
    }
    createUser = async (userData) => {
        // Seteo de variables iniciales
        const { first_name, last_name, email, age, password} = userData
        let cartVirtualId
        
        // Validación de que el usuario no exista
        const existAlredy = await this.getUser(email)
        if (existAlredy.status) {
                 // Creación de carrito y obtencion de cartId
                 const cartManagerResponse = await this.cartManager.createCart()
                 cartVirtualId = cartManagerResponse._id.toString()
                 // Creación de user con Mongoose
                 let newUser = {
                     first_name: first_name, 
                     last_name: last_name, 
                     email: email, 
                     age: age,
                     password: password, 
                     cartId: cartVirtualId
                 }
                 newUser = filterCleanStrings (newUser)
                 if (
                     newUser.email != undefined && 
                     newUser.password  != undefined && 
                     newUser.cartId != undefined &&
                     newUser.first_name != undefined && 
                     newUser.last_name != undefined
                     ) {                        
                     const result = await this.service.create(newUser)
                    return (result)
                    
                 } else {
                     const emptyFields = emptyFieldDetector (newUser)
                     cartVirtualId && this.cartManager.deleteCart (cartVirtualId)
                     return  {status: "error", payload: `Faltaron completar datos: ${emptyFields}`}
                 } 
        } else {
            return ({status: "error", payload:"El correo electronico ya se encuentra registrado"});
        } 
    }
    userCheck = async (email, password) =>{
        const data = await this.getUser(email)
        console.log ("check data in userController is usercheck", data)
        if (data.status === "error") {   
            return ({status: "error", payload: "El correo eletronico no se encuentra registrado"})
        } else {
            console.log ("check pasword validator parameters hash pass y pass", data, password)
            if (passwordValidator(password, data.password)) {
                return new userGetterDto (data)
            } else{
                return ({status: "error", payload: "La contraseña es incorrecta"})
            }
        }

    }
    updateUser = async (uid, userData) => { 
        return await this.service.update (uid, userData)
    }
    deleteUser = async (uid) => { 
        try {
            // busqueda del usuario
            const userFind = await this.getUser(uid)
            console.log ("check userFind in user controller is deleteUser", userFind)
            if (userFind && userFind._id) {
                console.log ("ingresa al if")
                // Elminación del carrito del usuario
                await this.cartManager.deleteCart(userFind.cartId)
                // Eliminación del usuario
                const result = await this.service.delete (uid)
                return {status: "succes", payload: result}
            } else {
                console.log ("ingresa al else")
                return {status: "error", payload:"El usuario no fue encontrado"}
            }
        } catch (error) {
            return {status: "error", payload: error}
        }

    }
}

module.exports = userController;