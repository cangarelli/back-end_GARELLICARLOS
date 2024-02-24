import React from 'react'

const queryMaker = ({category, status, order, limit, onPage}) => {
    const query = ["?"]
    console.log ("check category of query Maker", category)
    // Procesamiento logico
    category != null && query.push (`category=${categorie}`)
    status != null && query.push (`status=true`)
    onPage != null && query.push (`onPage=${onPage}`)
    order != null && (()=> {
        if (order == "orderLow" ) {
            query.push (`order=desc`)
        } else if (order == "orderHeigh" ) {
            query.push (`order=asc`)
        }
    }) ()
    limit != null && query.push (`limit=${limit}`)

    const response = query.join("&")
    // Retorna la query
    return response
}

export default queryMaker