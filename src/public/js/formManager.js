// Función que cree y función que borre formulario al hacer un click. Requiere que sea una función de escucha?
function addProductForm() {
    const father = document.getElementById('root');
    const formulario = document.createElement('form');
    formulario.className = 'form';
    // formulario.action =
    formulario.method = 'post';
    formulario.id = 'newProductForm';
    formulario.innerHTML = `
    <button type="button" value="close">X</button>
    <div class="form__box">
    <label for="nombre">Nombre del producto:</label>
    <input type="text" name="nombre" id="title">
</div>
<div class="form__box">
    <label for="descripcion">Descripcion del producto:</label>
    <input type="text" name="descripcion" id="description">
</div>
<div class="form__box">
    <label for="precio">Cada unidad del producto cuesta:</label>
    <input type="text" name="precio" id="price">
</div>
<div class="form__box">
    <label for="serialNumber">Ingrese en numero de serie del producto:</label>
    <input type="text" name="serialNumber" id="code">
</div>
<div class="form__box">
    <label for="stock">Unidades disponibles:</label>
    <input type="text" name="stock" id="stock">
</div>
    <div class="form__box">
    <label for="foto">Carga una imagen del producto</label>
    <input type="image" name="foto" id="thumbnail">
</div>
<input type="submit" value="Cargar producto">`;
    father.appendChild(formulario);
}
function deleteElement(id) {
    const elementSelect = document.getElementById(id);
    elementSelect != null && elementSelect.remove();
}

const productFormManager = (action) => {
    if (action === 'create') {
        const existe = document.getElementById('newProductForm');
        existe === null && addProductForm();
    } else if (action === 'close') {
        deleteElement('newProductForm');
    }
};
const formDataManager = (nodos) => {
    const dataSource = nodos.reduce((key, nodo) => {
        const mark = document.getElementById(nodo);
        key[nodo] = mark.value;
        return key;
    }, {});
    console.log(dataSource);
    return dataSource;
};
async function formPostData(info, route) {
    await fetch(route, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Respuesta del servidor:', data);
            // Hacer algo con la respuesta del servidor
        })
        .catch((error) => {
            console.error('Error al enviar la solicitud:', error);
        });
}
module.exports = { productFormManager, formDataManager, formPostData };
// export default productFormManager;
