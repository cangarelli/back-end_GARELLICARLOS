const handelbars = require('express-handlebars'); /* Inmportación de motor de plantillas */
const path = require('path');
 
const handelbarsConfig = (app) => {
    app.engine(
        'hbs',
        handelbars.engine({
            extname: '.hbs',
            helpers: {
                root: () => path.join(path.resolve(__dirname,'../public')),
            },
        })
    );

    app.set('view engine', 'hbs'); /* Seteo de motor a utilizar */
    app.set('views', __dirname + '/views'); /* Definición de ruta donde estan las plantillas */
}

module.exports = handelbarsConfig