const userCreateDto = require('../dto/userCreateDto');
const userGetterDto = require('../dto/userGetterDto');
const { createHash } = require('../helpers/userApiUtils/hashPasswordManager');

class usersRepository {
    constructor(dao) {
        this.daoService = dao;
    }
    create = async (userData) => {
        const userDataModified = new userCreateDto(userData);
        const response = await this.daoService.create(userDataModified);
        return new userGetterDto(response);
    };

    update = async (userId, data) => await this.daoService.update(userId, data);

    userSearch = async (uid) => await this.daoService.userSearch(uid);
    changeRole = async (email, role) => await this.daoService.changeRole (email, role)
    updatePassword = async (email, password) => {
        const passwordHashed = createHash(password.trimEnd());
        const response = await this.daoService.updatePassword(email, passwordHashed);
        if (response) return 'Password successfully updated';
    };

    userSearchByEmail = async (email) => await this.daoService.userSearchByEmail(email);

    delete = async (uid) => await this.daoService.delete(uid);

    getAllKeyValues = async (key) => await this.daoService.getAllKeyValues(key);
}
module.exports = usersRepository;
