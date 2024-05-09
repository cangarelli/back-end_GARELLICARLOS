class userDataFilterDto {
    constructor(userData) {
        this.id = userData._id.toString();
        this.full_name = userData.full_name;
        this.email = userData.email.trimEnd();
        this.cartId = userData.cartId;
        this.role = userData.role;
    }
}

module.exports = userDataFilterDto;
