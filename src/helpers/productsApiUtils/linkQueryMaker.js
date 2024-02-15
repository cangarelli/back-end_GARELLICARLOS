function linkQueryMaker({category, disponibility, order, limit, thePage}) {
    // Iniciando instancia de querys
    const query = ["?"]
    // SETEO DE CADA QUERY en array de strings
    category != undefined && query.push (`category=${category}`)
    disponibility != undefined && query.push (`status=${disponibility}`)
    order != undefined && query.push (`order=${order}`)
    limit != undefined && query.push (`limit=${limit}`)
    thePage != undefined && query.push (`onPage=${thePage}`)

    //COMPAGINACION DEL STRING
    const response = query.join("&")

    return (response)
}
module.exports = linkQueryMaker;