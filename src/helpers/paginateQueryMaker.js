function paginateQueryMaker({category, disponibility, order, limit, page}) {
    let filter
    let pagination

    // SETEO DEL FILTER SEGUN QUERYS
    if ( category != undefined && disponibility == undefined) {
        filter = ({category: { $in: category }})
    } else if (category == undefined && disponibility != undefined)  {
        filter = ({status: disponibility})
    } else if (category != undefined && disponibility != undefined) {
        filter = ({category: { $in: category }, status: disponibility})
    } else {
        filter = ({})
    }
    
    // SETEO DE PAGINATION SEGUN QUERYS
    page = page || 1
    if (limit != undefined) {
        pagination = {limit: limit, page: page, lean: true }
        if (order != undefined) {
            pagination.sort = order == "asc" ? {price: -1} : {price: 1}
        }
    } 

    return ({filter, pagination})
}

module.exports = paginateQueryMaker;