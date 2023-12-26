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
        <div id=${element._id}>
            <button value="create-update">Update</button>
            <button value="delete">Eliminar</button>
            <button value="add-to-cart">Agregar al carrito</button>
        </div>`
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
        // Create
        case 'create':
            productFormManager(e.target.value, 'newProductForm');
            break;
        case 'cargar-producto':
            await upLoadProduct({ apiRoute: `/api/products/mongo`, method: 'POST', formId: e.target.parentNode.id});
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        // Update
        case 'create-update':
            productFormManager(e.target.value, 'updateForm', e.target.parentNode.id);
            break;
        case 'update-producto':
            await upLoadProduct({ apiRoute: `/api/products/mongo/${e.target.id}`, method: 'PUT', formId: e.target.parentNode.id });
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        // Delete
        case 'delete':
            await formFetchtData({ route: `/api/products/mongo/${e.target.parentNode.id}`, method: 'DELETE' });
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        // Pop Up Global 
        case 'close':
            productFormManager(e.target.value, e.target.parentNode.id);
            break;
        // CHAT APP
        case 'Enviar':
            const info = {user, message: chatLetter.value}
            await formFetchtData({ route: `/api/chat/`, info, method: "POST"})
            chatLetter.value= ``;
            socket.emit("message", user)
            break;
        // CART Cases
        case "clear-cart": 
            break;
        case "substract-of-cart":
            break;
        case "add-to-cart":
            let intenta = await formFetchtData({ route: `/api/products/mongo/${e.target.parentNode.id}`, method: 'GET' });
            await formFetchtData({ route: `/api/carts/658388103a44d83d3749d1d6/product/${e.target.parentNode.id}`, method: 'POST' });
            console.log ("data product", intenta)
            intenta.stock = intenta.stock - 1
            await formFetchtData({ route: `/api/products/mongo/${e.target.parentNode.id}`,info: intenta, method: 'PUT' });
            socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        case "delete-of-cart":
            break;
    }
});