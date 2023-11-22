const fs = require('fs');
const recuperarDatos = async (ruta) => {
    if (fs.existsSync(`${ruta}`)) {
        const productJson = await fs.promises.readFile(`${ruta}`, 'utf-8');
        return JSON.parse(productJson);
    } else {
        return [];
    }
};

export default recuperarDatos;