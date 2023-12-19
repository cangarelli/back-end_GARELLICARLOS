//Importación de modulos de terceros
let socket;

socket = io();
socket.emit('conection', 'client connected');
socket.on('update-productList', (data) => {
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

socket.on("update-chat", async data => {
    await socket.on ("loadUser", async data => data.length > 0 && (() => user = data))
    
    const chatBox = document.querySelector(".chat__box")

    data.forEach(messageElement => {
        const messageLine = document.createElement ("div")
        messageLine.className ="chat__box--userMessage"
        messageLine.innerHTML = `
        <p>${messageElement.user}:</p>
        <p>${messageElement.message} </p>`
        chatBox.appendChild(messageLine)
    })
})
// NODOS DE DE EVENTOS
const onePage = document.getElementById('root');
const chatLetter = document.querySelector("#chatBox")

// MANEJO DE EVENTOS DEL SITIO WEB
onePage.addEventListener('click', async (e) => {
    if (e.target.value.length > 0) {
        e.preventDefault();
    }
    switch (e.target.value) {
        case 'create':
            productFormManager(e.target.value, 'newProductForm');
            break;
        case 'close':
            productFormManager(e.target.value, e.target.parentNode.id);
            break;
        case 'cargar-producto':
            await upLoadProduct({ apiRoute: `/api/products/`, method: 'POST', formId: e.target.parentNode.id});
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        case 'create-update':
            productFormManager(e.target.value, 'updateForm', e.target.id);
            break;
        case 'update-producto':
            await upLoadProduct({ apiRoute: `/api/products/${e.target.id}`, method: 'PUT', formId: e.target.parentNode.id });
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        case 'delete':
            await formFetchtData({ route: `/api/products/${e.target.id}`, method: 'DELETE' });
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        case 'Enviar':
            const info = {user, message: chatLetter.value}
            await formFetchtData({ route: `/api/chat/`, info, method: "POST"})
            chatLetter.value= ``;
            socket.emit("message", user)
            break;
    }
});