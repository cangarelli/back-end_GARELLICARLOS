// Importación de modulo mongoose.connect con destructuring
const { connect } = require('mongoose');
const { logger } = require('../helpers/helpersBarrel.js');
const configObject = require('./configObjetc.js');

// Cración de conección
const connectDB = async () => {
    await connect(configObject.mongo_url);
    logger.Info('Base de datos conectada');
};
// "mongodb+srv://agarelli91:5d8a6fsFWa6@anlugamescluster.mgh6ee1.mongodb.net/ecommerce?retryWrites=true&w=majority"
module.exports = {
    connectDB,
};
