// Modulos importados
const { cartsModel } = require ("../models/carts.model.js")
const { usersModel } = require ("../models/user.model.js")
const CartMongoManager = require ("./CartMongoManager.js")
const apiCaller = require ("../../helpers/apiCaller.js")

const cartManager = new CartMongoManager()

// CLASE CONSTRUCTORA
class UserMongoManager {
    constructor() {}
    async create(userData) {
        const { first_name, last_name, email, gender, password } = userData
        try {
            // Creación de carrito y obtencion de cartId
            const cartManagerResponse = await cartManager.createCart()
            const cartId = cartManagerResponse.payload._id.toString()

            // Creación de user con Mongoose
            const newUser = await usersModel.create({
                first_name: first_name, 
                last_name: last_name, 
                email: email, 
                gender: gender, 
                password: password, 
                cartId: cartId})

            // Respuesta
            return ({ status: 'succes', payload: newUser });
            
        } catch (error) {
            console.log (error)
            return ({ status: 'error', payload: 'user not created' });
        }

    }

    async update(userId, data) {
        try {
            
        } catch (error) {
            console.log (error)
            return (error);
        }
    }
    async find({userId, data}){
        try {

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