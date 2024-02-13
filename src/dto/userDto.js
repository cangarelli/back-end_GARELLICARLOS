const { createHash } = require("../helpers/hashPasswordManager")

class userDto{ 
    constructor (userData) {
        this.first_name = userData.first_name.trimEnd()
        this.last_name = userData.last_name.trimEnd()
        this.full_name = `${this.first_name} ${this.last_name}`
        this.email = userData.email.trimEnd()
        this.password = createHash(userData.password.trimEnd())
        this.cartId = userData.cartId
        this.age = userData.age
    }
}

module.exports = userDto