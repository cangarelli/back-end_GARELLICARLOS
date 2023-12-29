function paginateQueryMaker({category, disponibility, order, limit, page}) {
    let filter
    let pagination
    if ( category != undefined && disponibility == undefined) {
        filter = ({category: category})
    } else if (category == undefined && disponibility != undefined)  {
        filter = ({status: disponibility})
    } else if (category != undefined && disponibility != undefined) {
        filter = ({category: category, status: disponibility})
    } else {
        filter = ({})
    }
    page = page || 1
    if (limit != undefined) {
        pagination = {limit: limit, page: page, lean: true }
    } 
    console.log ("helper", filter, pagination)
    return ({filter, pagination})
}

module.exports = paginateQueryMaker;