function dataSelector(dataTypes, key) {
    if (dataTypes == undefined) {
        ('valid data');
    } else {
        return dataTypes[key];
    }
}
const userDataErrorInfo = (data, dataTypes) => {
    const errors = [];
    for (const key in data) {
        errors.push(`* ${key}: needs to by a ${dataSelector(dataTypes, key)}, recived: ${data[key]}`);
    }
    if (errors > 0) return `One or more data are incomplete or not valid. \n ${errors.join('\n')}`;
};

const userCredentialsErrorInfo = (data) => {
    const errors = [];
    for (const key in data) {
        errors.push(`* ${key}: needs to by a ${funcion}, recived: ${data[key]}`);
    }
    if (errors > 0) return `One or more data are incomplete or not valid. \n ${errors.join('\n')}`;
};

module.exports = {
    userDataErrorInfo,
    userCredentialsErrorInfo,
};
