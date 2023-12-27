async function stockManager(quantity, pid) {
    // UpdateOne apicaller que modifica stock
        // Si el stock es 0 cambia el status a false
}

const queryMaker = ({category, status, order, limit}) => {
    const query = ["?"]
    // Procesamiento logico
    category != undefined && query.push (`category=${category}`)
    status != undefined && query.push (`status=${status}`)
    order != undefined && query.push (`order=${order}`)
    limit != undefined && query.push (`limit=${limit}`)

    const response = query.join("&")
    // Retorna la query
    return response
}