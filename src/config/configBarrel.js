const program = require('./commanders.js');
const configObject = require('./configObjetc.js');
const expressConfig = require('./express-config.js');
const handelbarsConfig = require('./handelbars-config.js');

const { connectDB } = require('./mongoose-config.js');
const { initializePassportJWT } = require('./passport-config.js');
const initializeSoketServer = require('./socket-config.js');

module.exports = {
    program,
    expressConfig,
    handelbarsConfig,
    configObject,
    connectDB,
    initializePassportJWT,
    initializeSoketServer,
};
