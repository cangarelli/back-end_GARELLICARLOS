const generateRandomCode = (length) => {
    // Array de caracteres alfanuméricos
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        // Generar un índice aleatorio entre 0 y la longitud del array de caracteres
        const randomIndex = Math.floor(Math.random() * characters.length);
        // Obtener el caracter aleatorio del array
        const randomCharacter = characters[randomIndex];
        // Agregar el caracter aleatorio al código
        code += randomCharacter;
    }
    // Retornar el código generado
    return code;
};

const ticketCodeGenerator = (codesArray, length) => {
    let newCode;

    do {
        newCode = generateRandomCode(length);
    } while (codesArray.includes(newCode));
    return newCode;
};

module.exports = ticketCodeGenerator;
