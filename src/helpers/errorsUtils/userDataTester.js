const { CustomErrors, EErrors, userDataErrorInfo, logger } = require('../helpersBarrel.js');

function firstControl(data) {
    if (data === undefined) {
        return { code: EErrors.USER__NULL_DATA__ERROR };
    } else {
        return null;
    }
}
function secondControl(data) {
    if (
        data.every((key) => {
            return key !== undefined;
        })
    ) {
        return null;
    } else {
        return { code: EErrors.USER__MISS_DATA__ERROR };
    }
}
async function thirdControl(data, manager) {
    let checker = [];
    let dataTypes = {};
    for (const key of data) {
        const dataType = await manager.getType(`${key}`);
        logger.Debug('check dataType of user data tester', dataType);
        dataTypes[key] = dataType;
        typeof data[key] === dataType && checker.push(true);
    }
    if (!checker.includes(false)) {
        return { code: EErrors.USER__WRONG_DATA__ERROR, dataTypes };
    } else {
        return null;
    }
}

const userDataTester = async (data, manager) => {
    let errorCode = null;
    // 1º control: Que manden datos.
    errorCode = firstControl(data);

    // 2º control: Que manden todos los datos requeridos.
    if (errorCode === null) {
        errorCode = secondControl(data);
    }

    // 3º control: Que todos los datos enviados sean correctos.
    if (errorCode === null) {
        errorCode = await thirdControl(data, manager);
    }

    // Creacion del error si lo hay.
    if (errorCode !== null) {
        CustomErrors.createError({
            name: 'Data base post route error',
            cause: userDataErrorInfo(data, errorCode.dataTypes),
            message: 'Error trying to create DB document',
            code: errorCode.code,
        });
    }
};

module.exports = userDataTester;
