//Importación de modulos de terceros

let socket;
if (exist) {
    socket = io();
    socket.emit('upLoadFormData', 'server connected');
    socket.on('actualizar-pagina', (data) => {
        console.log('actualizando pagina');
        const gondola = document.getElementsByClassName('gondola');
        gondola[0].innerHTML = ``;
        data.forEach((element) => {
            const productCard = document.createElement('div');
            productCard.className = 'gondola__productCard';
            productCard.innerHTML = `
            <h1>${element.title}</h1>
            <h2>Cuesta ${element.price}</h2>
            <p>Qudan: ${element.stock}</p>
            <p>${element.description}</p>
            <div>
                <button value="create-update" id=${element.id}>Update</button>
                <button value="delete" id=${element.id}>Eliminar</button>
            </div>`;
            gondola[0].appendChild(productCard);
        });
    });
}
const onePage = document.getElementById('root');

onePage.addEventListener('click', async (e) => {
    if (e.target.value.length > 0) {
        e.preventDefault();
    }
    console.log(e.target.value);
    switch (e.target.value) {
        case 'create':
            productFormManager(e.target.value, 'newProductForm');
            break;
        case 'close':
            productFormManager(e.target.value, 'newProductForm');
            break;
        case 'cargar-producto':
            const nodos = ['title', 'price', 'description', 'stock', 'code', 'thumbnail'];
            const loadingProduct = formDataManager(nodos);
            await formFetchtData({ route: '/api/products/', info: loadingProduct, method: 'POST' });
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        case 'create-update':
            productFormManager(e.target.value, 'updateForm', e.target.id);
            break;
        case 'close-update':
            productFormManager(e.target.value, 'updateForm');
        case 'update-producto':
            const updatableData = ['title', 'price', 'description', 'stock', 'code', 'thumbnail'];
            const updateData = formDataManager(updatableData);
            await formFetchtData({ route: `/api/products/${e.target.id}`, info: updateData, method: 'PUT' });
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        case 'delete':
            await formFetchtData({ route: `/api/products/${e.target.id}`, method: 'DELETE' });
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
    }
});
