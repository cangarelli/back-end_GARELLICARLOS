// Importación de modulo mongoose.connect con destructuring
const { connect } = require("mongoose")
const dotenv = require ("dotenv")
const { program } = require("../helpers/commanders")

const { mode } = program.opts()
dotenv.config({
    path: mode === "production" ? "./.env.production":"./.env.development"
})

const configObject = {
    PORT: process.env.PORT || 4000,
    mongo_url: process.env.MONGO_URL,
    jwt_secret_key: process.env.jwt_secret_key,
}
// Cración de conección
    const connectDB = async () => {
        await connect(process.env.MONGO_URL)
        console.log ("Base de datos conectada")
    }
// "mongodb+srv://agarelli91:5d8a6fsFWa6@anlugamescluster.mgh6ee1.mongodb.net/ecommerce?retryWrites=true&w=majority"
module.exports = {
    configObject,
    connectDB 
};