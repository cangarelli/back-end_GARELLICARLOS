//Modulos nativos importados
const fs = require('fs');
const recuperarDatos = require('./fileManagers/recuperarDatos');
const persistenciaDatos = require('./fileManagers/persistenciaDatos');
// import { recuperarDatos, persistenciaDatos } from '../helpers/helpersBarrel';

// CLASE CONSTRUCTORA
class ProductManager {

    constructor() {
        this.userData = [];
        this.path = 'src/DB-files/users.json';
    }
    
    async create(userData) {
        return ("working on it")            
    }

    async update(userId, data) {
        return ("working on it")
    }
    async userSearch(uid) {
        return ("working on it")
    }
    async userSearchByEmail(email){
        return ("working on it")
    }
    async userCheck({userMail, userPassword}){
        return ("working on it")
    }
    async delete (userId) {
        return ("working on it")
    }

}
module.exports = ProductManager;
