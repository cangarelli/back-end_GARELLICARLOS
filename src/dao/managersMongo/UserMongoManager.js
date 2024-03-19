// Modulos importados
const { usersModel } = require('./models/user.model.js');
const { createHash, passwordValidator } = require('../../helpers/userApiUtils/hashPasswordManager.js');

// CLASE CONSTRUCTORA
class UserMongoManager {
    constructor() {}

    create = async (userData) => await usersModel.create(userData);

    changeRole = async (email, role) =>
        await usersModel.findOneAndUpdate({ email }, { role: role }, { new: true });

    update = async (userId, data) => 'working on it';

    updatePassword = async (email, passwordHashed) =>
        await usersModel.findOneAndUpdate({ email }, { password: passwordHashed }, { new: true });

    userSearch = async (uid) => await usersModel.findOne({ _id: uid });

    userSearchByEmail = async (userEmail) => await usersModel.findOne({ email: userEmail });

    delete = async (userId) => await usersModel.deleteOne({ _id: userId });

    getAllKeyValues = async (key) => await usersModel.distinct(key);
}

module.exports = UserMongoManager;
