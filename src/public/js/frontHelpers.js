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

const optionSelector = (option) => {
    let optionRead 
    switch (option) {
        case "-1":
            optionRead = {order: -1}
            break;
        case "+1":
            optionRead = {order: +1}
            break;
        case "status":
            optionRead = "changeStatus"
            break;    
        default:
            optionRead = option
            break;
    }
    console.log ("check helper", optionRead)
    return optionRead
}
async function cartStockManager({pid, cid}) {
    const data = await formFetchtData({ route: `/api/carts/658388103a44d83d3749d1d6/product/${e.target.parentNode.id}`, method: 'POST' });
    console.log ("data product", data)
    intenta.stock = intenta.stock - 1
    await formFetchtData({ route: `/api/products/mongo/${e.target.parentNode.id}`,info: intenta, method: 'PUT' });

}