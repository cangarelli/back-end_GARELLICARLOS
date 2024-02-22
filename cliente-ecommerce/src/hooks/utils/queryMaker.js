import React from 'react'

const queryMaker = ({categorie, status, order, limit}) => {
    const query = ["?"]
    console.log (categorie)
    // Procesamiento logico
    categorie != undefined && query.push (`category=${categorie}`)
    status != undefined && query.push (`status=true`)
    order != undefined && (()=> {
        if (order == "orderLow" ) {
            query.push (`order=desc`)
        } else if (order == "orderHeigh" ) {
            query.push (`order=asc`)
        }
    }) ()
    limit != undefined && query.push (`limit=${limit}`)

    const response = query.join("&")
    // Retorna la query
    return response
}

export default queryMaker