// Importación de modulos de node
const passport = require ("passport")
const local = require ("passport-local")
const passportGitHub = require ("passport-github")

// Importación de modulos propios
const userMongoManager = require ("../dao/managersMongo/UserMongoManager.js")
const {createHash, passwordValidator} = require ("../helpers/hashPasswordManager.js")

//Creacion de instancias de managers
const userManager = new userMongoManager();

const LocalStrategy =  local.Strategy
exports.initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email",
    }, async (req, username, password, done) => {
        try {
            // Seteo de variables
            const {first_name, last_name, email} = req.body
            console.log ("check users router post body", req.body)
            // Gestion de datos
            const result = await userManager.create({
               first_name: first_name, last_name: last_name, email: username, password: password
            })
            // Manejo de respuesta      
            if (result.status == "error"){
                return done ("Error al crear el usuario: "+result.payload)
            } else if (result.status == "succes"){
                return done(null, result)
            }
        
        } catch (error) {
            return done("Error al crear usuario: "+error)
        }
    }))
}