// Modulos importados
const { usersModel } = require ("./models/user.model.js")
const {createHash, passwordValidator} = require ("../../helpers/hashPasswordManager.js")

// CLASE CONSTRUCTORA
class UserMongoManager {
    constructor() {}
    async create(userData) {
        try {
            const newUser = await usersModel.create(userData)
            return ({status: "succes", payload: newUser})
        } catch (error) {
            return ({status: "error", payload: error})
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
            return userData
        } catch (error) {
            console.log (error)
            return (error);
        }
    }
    async userSearchByEmail(email){
        try {
            const userData = await usersModel.findOne({email: email})
            console.log ("check ")

            if (userData) {
                return ({status: "succes", payload: userData})
            } else {
                return ({status: "error", payload: "user doesnt exist"})
            }
        } catch (error) {
            console.log (error)
            return (({status: "error", payload: error}));
        }
    }
    async userCheck({userMail, userPassword}){
        try {
            const data = await usersModel.findOne({email: userMail})
            if (data) { // Si existe ese correo en la base de datos  
                console.log ("check password Validator en user mongo Manager", passwordValidator(userPassword, data.password))     
                if (passwordValidator(userPassword, data.password)) {
                    if (data.email.includes("gmail.com")) {
                        return ({ first_name: data.first_name, last_name: data.last_name, userId: data._id.toString(), role: "admin",cartId: data.cartId})
                    } else {
                        return ({ first_name: data.first_name, last_name: data.last_name, userId: data._id.toString(), role: "user", cartId: data.cartId})
                    }     
                } else {
                    return ("La contraseña es incorrecta")
                }
            } else { // Si no existe
                return ("El correo electronio brindado no esta registrado")
            }
        } catch (error) {
            console.log (error)
            return (error);
        }
    }
    async delete (userId) {
        try {
            // Eliminación del usuario
            const response = await usersModel.deleteOne({ _id: userId }) 
            // Respuesta
            return (response)
        } catch (error) {
            console.log (error)
            return (error);
        }
    }

}

module.exports = UserMongoManager;