const timeGetter = () => {
    const actualDate = new Date();
    const date = `${actualDate.getDate()}/${actualDate.getMonth()}/${actualDate.getFullYear()} at ${actualDate.getHours()}:${actualDate.getMinutes()} hs`;
    return date;
};
module.exports = timeGetter;
