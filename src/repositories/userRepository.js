const userDto = require("../dto/userDto")

class usersRepository { 
    constructor(dao){
        this.daoService = dao
    }
    getUser = async (uid) => await this.daoService.getUser(uid)
    createUser = async (userData) => { 
        const userDataModified = userDto (userData)
        return await this.daoService.createUser (userDataModified)
    }
    userCheck = async (email, password) => await this.daoService.userCheck(email, password)
    updateUser = async () => await this.daoService.updateUser()
    deleteUser = async (uid) => await this.daoService.deleteUser (uid)
}
module.exports = usersRepository