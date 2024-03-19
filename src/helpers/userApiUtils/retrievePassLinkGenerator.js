const configObject = require('../../config/configObjetc');
const jwt = require('jsonwebtoken');

const retrievePassLinkGenerator = (email) => {
    // Generar un token con vencimiento que incluya el email del usuario
    const token = jwt.sign({ user }, configObject.jwt_secret_key, { expiresIn: '1h' });
    //Añadirlo a un link
    const temporalLink = `http://localhost:5173/retrievepass/${token}`;
    //Retornoar el linñ
    return temporalLink;
};

module.exports = retrievePassLinkGenerator;
