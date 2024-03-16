// Products api utils
const apiCaller = require('./productsApiUtils/apiCaller.js');
const linkQueryMaker = require('./productsApiUtils/linkQueryMaker.js');
const paginateQueryMaker = require('./productsApiUtils/paginateQueryMaker.js');
const selectorQuery = require('./productsApiUtils/selectorQuery.js');
const { generateProduct } = require('./productsApiUtils/mokingUtils.js');

// Session api utils
const { createToken, validateToken, json_private_key } = require('./sessionApiUtils/jwt.js');
const authorizationJWT = require('./sessionApiUtils/authorizationJWT.middleware.js');
const passportCall = require('./sessionApiUtils/passportCall.js');

// User api utils
const { createHash, passwordValidator } = require('./userApiUtils/hashPasswordManager.js');

// Mailing api utils
const { sendMail } = require('./mailingApiUtils/sendMail.js');

// Views api utils
const sessionLoader = require('./viewsApiUtils/sessionLoader.js');

// Cart api Utils

const amountCalculator = require('./cartApiUtils/amountCalculator.js');
const cartReviewer = require('./cartApiUtils/cartReviewer.js');
const stockReviewer = require('./cartApiUtils/stockReviewer.js');
const timeGetter = require('./cartApiUtils/timeGetter.js');
const ticketCodeGenerator = require('./cartApiUtils/ticketCodeGenerator.js');

// Errors Utils
const CustomErrors = require('./errorsUtils/CustomErrors.js');
const EErrors = require('./errorsUtils/EErrors.js');
const { userDataErrorInfo } = require('./errorsUtils/generateErrorInfo.js');
const { logger, addLogger } = require('./errorsUtils/logger.js');

module.exports = {
    apiCaller,
    generateProduct,
    linkQueryMaker,
    paginateQueryMaker,
    selectorQuery,
    createHash,
    passwordValidator,
    createToken,
    validateToken,
    json_private_key,
    authorizationJWT,
    sessionLoader,
    passportCall,
    amountCalculator,
    cartReviewer,
    stockReviewer,
    timeGetter,
    ticketCodeGenerator,
    CustomErrors,
    EErrors,
    userDataErrorInfo,
    logger,
    addLogger,
    sendMail,
};
