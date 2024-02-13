class userDto{
    constructor (userData) {
        this.first_name = userData.first_name
        this.last_name = userData.last_name
        this.email = userData.email 
        this.pasword = userData.pasword
        this.full_name = `${first_name} ${last_name}`
    
    }
}

module.exports = userDto