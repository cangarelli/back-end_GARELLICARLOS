const userDto = require("../dto/userDto")

class usersRepository { 
    constructor(dao){
        this.daoService = dao
    }
    create = async(userData) => {
        const userDataModified = new userDto(userData)
        return await this.daoService.create (userDataModified)
    }
    
    update = async (userId, data) => await this.daoService.update (userId, data)
    
    userSearch = async (uid) => await this.daoService.userSearch (uid)
   
    userSearchByEmail = async (email) => await this.daoService.userSearchByEmail (email)

    delete = async (uid) => await this.daoService.delete(uid)

    getAllKeyValues = async (key) => await this.daoService.getAllKeyValues(key)
}
module.exports = usersRepository