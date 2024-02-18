const timeGetter = () =>{
    const actualDate = new Date()
    return (`${actualDate.getDate()}/${actualDate.getMonth()}/${actualDate.getFullYear()} at ${actualDate.getHours()}:${actualDate.getMinutes()} hs`)`${actualDate.getDate()}/${actualDate.getMonth()}/${actualDate.getFullYear()} at ${actualDate.getHours()}:${actualDate.getMinutes()} hs`
}
module.exports = timeGetter