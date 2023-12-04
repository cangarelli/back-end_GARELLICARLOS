// Función que cree y función que borre formulario al hacer un click. Requiere que sea una función de escucha?
function addProductForm(id) {
    const father = document.getElementById('root');
    const formulario = document.createElement('form');
    formulario.className = 'form';
    formulario.method = 'post';
    formulario.id = id;
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
    <label for="imageDir">Carga una imagen del producto</label>
    <input type="text" name="imageDir" id="thumbnail">
</div>
<input type="submit" value="cargar-producto">`;
    father.appendChild(formulario);
}
function deleteElement(id) {
    const elementSelect = document.getElementById(id);
    elementSelect != null && elementSelect.remove();
}
function updateProductForm(id, idProd) {
    const father = document.getElementById('root');
    const formulario = document.createElement('form');
    formulario.className = 'form';
    formulario.method = 'post';
    formulario.id = id;
    formulario.innerHTML = `
    <button type="button" value="close-update">X</button>
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
    <label for="imageDir">Carga una imagen del producto</label>
    <input type="text" name="imageDir" id="thumbnail">
</div>
<input type="submit" value="update-producto" id=${idProd}>`;
    father.appendChild(formulario);
}
const productFormManager = (action, id, idProd) => {
    switch (action) {
        case 'create':
            const existe = document.getElementById(id);
            existe === null && addProductForm(id);
            break;
        case 'close':
            deleteElement(id);
            break;
        case 'create-update':
            updateProductForm(id, idProd);
            break;
        case 'close-update':
            deleteElement(id);
            break;
    }
};
const formDataManager = (nodos) => {
    const dataSource = nodos.reduce((obj, nodo) => {
        const mark = document.getElementById(nodo);
        if (mark.value) {
            obj[nodo] = mark.value;
        }
        return obj;
    }, {});
    console.log(dataSource);
    return dataSource;
};
async function formFetchtData({ route, info, method }) {
    await fetch(route, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Respuesta del servidor:', data);
            // CHEQUEO RESPUESTA DEL SERVER
        })
        .catch((error) => {
            console.error('Error al enviar la solicitud:', error);
        });
}

// module.exports = productFormManager;
// // export { productFormManager, formDataManager, formFetchtData };
