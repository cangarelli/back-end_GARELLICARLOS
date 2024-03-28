const mongoose = require('mongoose');
const UserMongoManager = require('../dao/managersMongo/UserMongoManager');
const Assert = require('node:assert');
const chai = require('chai');

mongoose.connect(
    'mongodb+srv://agarelli91:5d8a6fsFWa6@anlugamescluster.mgh6ee1.mongodb.net/ecommerce?retryWrites=true&w=majority'
);
const assert = Assert.strict;
const expect = chai.expect;

describe('Testing de Users Dao', () => {
    before(function (params) {
        this.usersDao = new UserMongoManager();
    });
    beforeEach(function (params) {
        this.timeout(5000);
    });
    // Funcion IT: sirve para englobar cada test unitario
    it('Nuestro dao debe poder obtener un array de Usuarios', async function () {
        const res = await this.usersDao;
        assert.strictEqual(Array.isArray(res), true);
    });
});
