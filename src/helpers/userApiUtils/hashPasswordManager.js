const bcrypt = require ("bcrypt")

exports.createHash = (password) => {
    return (bcrypt.hashSync(password, bcrypt.genSaltSync(10)))
}
exports.passwordValidator = (userPassword, systemHashPass) => {
    return (bcrypt.compareSync(userPassword, systemHashPass))
}