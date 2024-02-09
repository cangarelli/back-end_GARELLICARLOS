const CartMongoManager = require("../dao/managersMongo/CartMongoManager");
const UserMongoManager = require("../dao/managersMongo/UserMongoManager");
const { createHash, passwordValidator } = require("../helpers/hashPasswordManager");

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
        this.service = new UserMongoManager()
        this.cartManager = new CartMongoManager ()
    }
    
    getUser = async (uid) => {
        if (uid.includes("@")) {
            const response = await this.service.userSearchByEmail(uid)
            return (response)
        } else {
            const response = await this.service.userSearch(uid)
            return (response)
        }
    }
    createUser = async (userData) => {
        // Seteo de variables iniciales
        const { first_name, last_name, email, age, password } = userData
        let cartVirtualId
        try {
                    // Validación de que el usuario no exista
            const existAlredy = await this.getUser(email)
            if (existAlredy.status == "succes") {
                return ({status: "error", payload:"El correo electronico ya se encuentra registrado"});
            } else {
                // Creación de carrito y obtencion de cartId
                const cartManagerResponse = await this.cartManager.createCart()
                cartVirtualId = cartManagerResponse.payload._id.toString()
                // Creación de user con Mongoose
                let newUser = {
                    first_name: first_name, 
                    last_name: last_name, 
                    email: email, 
                    age: age,
                    password: createHash(password), 
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
                    if (result.status == "error") {
                        cartVirtualId && this.cartManager.deleteCart (cartVirtualId)
                        return (result)
                    } else {
                        return (result)
                    }
                } else {
                    const emptyFields = emptyFieldDetector (newUser)
                    cartVirtualId && this.cartManager.deleteCart (cartVirtualId)
                    return  {status: "error", payload: `Faltaron completar datos: ${emptyFields}`}
                } 
                             

            } 
        } catch (error) {
            cartVirtualId && this.cartManager.deleteCart (cartVirtualId)
            console.log ("check catch error in controller route",error)
            return ({status: "error", payload: error})
        }

    }
    userCheck = async (email, password) =>{
        const data = await this.getUser(email)
        if (data.status == "succes") {
            console.log ("check data of userController is userCheck", data)
            const {payload} = data
            console.log ("check password Validator en userController is userCheck", passwordValidator(password, payload.password))     
            if (passwordValidator(password, payload.password)) {
                if (data.email.includes("gmail.com")) {
                    return ({ first_name: data.first_name, last_name: data.last_name, userId: data._id.toString(), role: "admin",cartId: data.cartId})
                } else {
                    return ({ first_name: data.first_name, last_name: data.last_name, userId: data._id.toString(), role: "user", cartId: data.cartId})
                }     
            }
        } else {
            return ({status: "error", payload: "El correo eletronico no se encuentra registrado"})
        }

    }
    updateUser = async () => { }
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
                return {status: "Error", payload:"El usuario no fue encontrado"}
            }
        } catch (error) {
            return {status: "Error", payload: error}
        }

    }
}

module.exports = userController;