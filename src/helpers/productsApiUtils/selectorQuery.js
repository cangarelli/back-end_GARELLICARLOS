function selectorQuery(query1, query2, query3, query4) {
    const response = []
    // Manejo del $match
    if ( query1 != undefined && query2 == undefined) {
        response.push ({$match:{category: query1}})
    } else if (query1 == undefined && query2 != undefined)  {
        response.push ({$match:{status: query2}})
    } else if (query1 != undefined && query2 != undefined) {
        response.push ({$match:{category: query1, status: query2}})
    } else {
        response.push ({$match: {}})
    }
    // Manejo del $sort
    if (query3 != undefined) {
        response.push ({$sort: {price: Number(query3)}})
    }
    // Manejo del limit
    if (query4 != undefined) {
        response.push ({$limit: Number(query4)})
    }

    // Respuesta
    return (response)
}
module.exports = selectorQuery