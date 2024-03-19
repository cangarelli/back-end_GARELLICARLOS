const formProcesor = (nodos) => {
  const dataSource = nodos.reduce((obj, nodo) => {
    const mark = document.getElementById(nodo);
    if (mark.value) {
      obj[nodo] = mark.value;
    }
    return obj;
  }, {});
  return dataSource;
};

export default formProcesor;
