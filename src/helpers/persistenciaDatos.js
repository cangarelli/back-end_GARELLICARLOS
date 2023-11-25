const fs = require('fs');
const persistenciaDatos = async (ruta, variableObjeto) => {
    const nuevoArray = JSON.stringify(variableObjeto, null, 2);
    await fs.promises.writeFile(`${ruta}`, nuevoArray);
};
module.exports = persistenciaDatos;
