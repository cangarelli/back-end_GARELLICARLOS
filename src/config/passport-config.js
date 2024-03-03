// Importación de modulos de node
const passport = require('passport');
const local = require('passport-local');
const jwt = require('passport-jwt');
// Importación de modulos propios
const { json_private_key } = require('../helpers/sessionApiUtils/jwt.js');
const userController = require('../controller/users.controller.js');

//Creacion de instancias de managers
const userManager = new userController();

// Jwt Strategy
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

exports.initializePassportJWT = () => {
    const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['token'];
        }
        return token;
    };
    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: json_private_key,
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    console.log('error en intializePassportJWT', error);
                    return done(error);
                }
            }
        )
    );
};

// Local strategy
const LocalStrategy = local.Strategy;
exports.initializePassportLocal = () => {
    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
            },
            async (req, username, password, done) => {
                try {
                    // Seteo de variables
                    const { first_name, last_name, email, age } = req.body;
                    console.log('check users router post body', req.body);
                    // Gestion de datos
                    const result = await userManager.createUser({
                        first_name: first_name,
                        last_name: last_name,
                        email: username,
                        password: password,
                        age,
                    });
                    // Manejo de respuesta
                    if (typeof result == 'object') {
                        console.log('ES POR ACA PAPA');
                        return done(null, result);
                    } else {
                        return done('Error al crear el usuario: ' + result);
                    }
                } catch (error) {
                    return done('Error al crear usuario: ' + error);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        console.log('check user in  serializeUser', user);
        done(null, user.payload._id);
    });
    passport.deserializeUser(async (id, done) => {
        console.log('check id in  deserializeUser', id);
        let user = await userManager.getUser(id); //busqueda por id de los datos del usuario
        done(null, user);
    });
};
