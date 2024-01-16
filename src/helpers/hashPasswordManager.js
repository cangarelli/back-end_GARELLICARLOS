const bcrypt = require ("bcrypt")

exports.createHash = (password) => {
    return (bcrypt.hashSync(password, bcrypt.genSaltSync(10)))
}
exports.passwordValidator = (password, user) => {
    return (bcrypt.compareSync(password, user))
}