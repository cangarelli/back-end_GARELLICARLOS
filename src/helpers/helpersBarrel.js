// products api utils
const apiCaller = require ("./productsApiUtils/apiCaller.js")
const linkQueryMaker = require ("./productsApiUtils/linkQueryMaker.js")
const paginateQueryMaker = require ("./productsApiUtils/paginateQueryMaker.js")
const selectorQuery = require ("./productsApiUtils/selectorQuery.js")
const { generateProduct } = require ("./productsApiUtils/mokingUtils.js")

// session api utils
const { createToken, validateToken, json_private_key} = require ("./sessionApiUtils/jwt.js")
const authorizationJWT = require ("./sessionApiUtils/authorizationJWT.middleware.js")

const passportCall = require ("./sessionApiUtils/passportCall.js")

// User api utils
const { createHash, passwordValidator } = require ("./userApiUtils/hashPasswordManager.js")


// Views api utils
const sessionLoader = require ("./viewsApiUtils/sessionLoader.js")

// Cart api Utils

const amountCalculator = require("./cartApiUtils/amountCalculator.js")
const cartReviewer = require ("./cartApiUtils/cartReviewer.js")
const stockReviewer = require ("./cartApiUtils/stockReviewer.js")
const timeGetter = require ("./cartApiUtils/timeGetter.js")
const ticketCodeGenerator = require ("./cartApiUtils/ticketCodeGenerator.js")



module.exports = {
    apiCaller,
    generateProduct,
    linkQueryMaker,
    paginateQueryMaker,
    selectorQuery,
    createHash, passwordValidator,
    createToken, validateToken, json_private_key,
    authorizationJWT,
    sessionLoader,
    passportCall,
    amountCalculator,
    cartReviewer,
    stockReviewer,
    timeGetter,
    ticketCodeGenerator
}