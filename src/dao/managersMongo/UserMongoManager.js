// Modulos importados
const { cartsModel } = require ("../models/carts.model.js")
const { usersModel } = require ("../models/user.model.js")
const CartMongoManager = require ("./CartMongoManager.js")
const apiCaller = require ("../../helpers/apiUtils/apiCaller.js")
const {createHash, passwordValidator} = require ("../../helpers/hashPasswordManager.js")

const cartManager = new CartMongoManager()

// CLASE CONSTRUCTORA
class UserMongoManager {
    constructor() {}
    async create(userData) {
        const { first_name, last_name, email, gender, password } = userData
        let cartVirtualId
        try {
            // Validación de que el usuario no exista
            const existAlredy = await usersModel.findOne({email: email})
            if (existAlredy) {
                return ({ status: 'error', payload: "El correo electronico ya se encuentra registrado" });
            } else {
                // Creación de carrito y obtencion de cartId
                const cartManagerResponse = await cartManager.createCart()
                cartVirtualId = cartManagerResponse.payload._id.toString()

                // Creación de user con Mongoose
                const newUser = await usersModel.create({
                    first_name: first_name, 
                    last_name: last_name, 
                    email: email,  
                    password: createHash(userData.password), 
                    cartId: cartVirtualId})

                // Respuesta
                return ({ status: 'succes', payload: newUser });
            }            
        } catch (error) {
            cartVirtualId && cartManager.deleteCart (cartVirtualId)
            console.log (error)
            return ({ status: 'error', payload: error });
        }

    }

    async update(userId, data) {
        try {
            
        } catch (error) {
            console.log (error)
            return (error);
        }
    }
    async userSearch(uid) {
        try {
            const userData = await usersModel.findOne({_id: uid})
            if (data) {
                return ({status: "succes", payload: userData})
            } else {
                return ({status: "error", payload: "user doesnt exist"})
            }
        } catch (error) {
            console.log (error)
            return (error);
        }
    }
    async userCheck({userMail, userPassword}){
        try {
            const data = await usersModel.findOne({email: userMail})
            if (data) { // Si existe ese correo en la base de datos  
                console.log ("check password Validator en user mongo Manager", passwordValidator(userPassword, data.password))     
                if (passwordValidator(userPassword, data.password)) {
                    if (data.email.includes("gmail.com")) {
                        return ({status: "succes", payload: { first_name: data.first_name, last_name: data.last_name, userId: data._id.toString(), role: "admin",cartId: data.cartId}})
                    } else {
                        return ({status: "succes", payload: { first_name: data.first_name, last_name: data.last_name, userId: data._id.toString(), role: null, cartId: data.cartId}})
                    }     
                } else {
                    return ({status: "error", payload: "La contraseña es incorrecta"})
                }
            } else { // Si no existe
                return ({status: "error", payload: "El correo electronio brindado no esta registrado"})
            }
        } catch (error) {
            console.log (error)
            return (error);
        }
    }
    async delete (userId) {
        try {
            // Seleccion y elminación del carrito
            const userFind = await usersModel.findOne({_id: userId})
            const cartDelete = await cartsModel.deleteOne({ _id: userFind.cartId })

            // Eliminación del usuario
            const response = await usersModel.deleteOne({ _id: userId }) 
            console.log ("check delete response", response)
            // Respuesta
            return (response)
        } catch (error) {
            console.log (error)
            return (error);
        }
    }

}

module.exports = UserMongoManager;