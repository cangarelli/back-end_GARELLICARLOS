function linkQueryMaker({category, disponibility, order, limit, thePage}) {
    const query = ["?"]
    console.log (category, disponibility, order, limit, thePage)
    category != undefined && query.push (`category=${category}`)
    disponibility != undefined && query.push (`status=${disponibility}`)
    order != undefined && query.push (`order=${order}`)
    limit != undefined && query.push (`limit=${limit}`)
    thePage != undefined && query.push (`onPage=${thePage}`)
    console.log ("query back maker", query)
    const response = query.join("&")
    console.log ("query 2", response)
    return (response)
}
module.exports = linkQueryMaker;