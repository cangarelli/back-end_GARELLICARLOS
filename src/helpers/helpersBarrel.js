// products api utils
const apiCaller = require ("./productsApiUtils/apiCaller.js")
const linkQueryMaker = require ("./productsApiUtils/linkQueryMaker.js")
const paginateQueryMaker = require ("./productsApiUtils/paginateQueryMaker.js")
const selectorQuery = require ("./productsApiUtils/selectorQuery.js")

// session api utils
const auth = require ("./sessionApiUtils/auth.middlewere.js")
const authorizationJWT = require ("./sessionApiUtils/jwt_passport.middleware.js")
const sessionLoader = require ("./sessionApiUtils/sessionLoader.js")
const passportCall = require ("./passportCall.js")

// User api utils



module.exports = {
    apiCaller,
    linkQueryMaker,
    paginateQueryMaker,
    selectorQuery,
    auth,
    authorizationJWT,
    sessionLoader,
    passportCall
}