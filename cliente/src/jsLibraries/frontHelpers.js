async function stockManager(quantity, pid) {
  // UpdateOne apicaller que modifica stock
  // Si el stock es 0 cambia el status a false
}

function nodosIdGeter(Father) {
  // Armar arrays de hijos del formulario donde estan los option div
  const boxNodos = Array.from(Father.childNodes);

  // Armar array de nodos de los elementos que estan dentro de los option div
  const optionsNodos = [];
  boxNodos.forEach((nodo) => {
    const geter = Array.from(nodo.childNodes);
    optionsNodos.push(geter);
  });
  // Recuperar los id de esos nodos y ponerlos en un solo arrays
  const fullIdArrays = optionsNodos.map((nodo) => {
    const listMaker = [];
    nodo.forEach((nodito) => {
      if (nodito.id != undefined && nodito.id.length > 1) {
        listMaker.push(nodito.id);
      }
    });
    return listMaker;
  });

  const leanIdArrays = fullIdArrays.filter((element) => element.length > 0);
  const concat = [].concat(...leanIdArrays);

  // Retorno de datos.
  return concat;
}

async function cartStockManager({ pid, cid }) {
  const data = await formFetchtData({
    route: `/api/carts/658388103a44d83d3749d1d6/product/${e.target.parentNode.id}`,
    method: 'POST',
  });
  console.log('data product', data);
  intenta.stock = intenta.stock - 1;
  await formFetchtData({
    route: `/api/products/mongo/${e.target.parentNode.id}`,
    info: intenta,
    method: 'PUT',
  });
}
