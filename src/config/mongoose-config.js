// Importación de modulo mongoose.connect con destructuring
const { connect } = require("mongoose")
// Cración de conección
    const connectDB = async () => {
        await connect("mongodb+srv://agarelli91:5d8a6fsFWa6@anlugamescluster.mgh6ee1.mongodb.net/ecommerce?retryWrites=true&w=majority")
        console.log ("Base de datos conectada")
    }

module.exports = connectDB;