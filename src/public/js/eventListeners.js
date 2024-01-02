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
const onePageMain = document.getElementById('mainRoot');
const onePageHeader = document.getElementById("headerRoot")
const chatLetter = document.querySelector("#chatBox")
const searchOptionMenu = document.getElementById("searchOptionMenu")
// MANEJO DE EVENTOS DEL SITIO WEB


// MANEJO DE EVENTOS DE LA NAV BAR
// /* En proceso... 

onePageHeader.addEventListener('click', async (e) => {

    switch (e.target.value) {  
        case "pull":

            break;
        case "Filter Search":
            // Recuperar parametros del filtro desde el dom
            const checkBoxes = document.querySelectorAll('input[type="checkbox"]:checked');

            let categoryParameters =[]
            let orderParameters = [] 
            let disponibility =[]
            checkBoxes.forEach((nodo) => {
                nodo.parentNode.className == "order" && orderParameters.push (nodo.id)
                nodo.parentNode.className == "categories" && categoryParameters.push (nodo.id)
                nodo.parentNode.className == "disponibility" && disponibility.push (nodo.id)
            })
            categoryParameters.length > 0 ? categoryParameters : categoryParameters = undefined
            orderParameters.length > 0 ? orderParameters : orderParameters = undefined
            disponibility.length > 0 ? disponibility : disponibility = undefined
            // Creacion de la query
            const query = queryMaker ({categorie: categoryParameters, status: disponibility, order: orderParameters}) 
            console.log ("query check",query)
            // Realización del filtrado y actualización de la pagina
            window.location.href = `/views/products${query}`;
            break;
    }
})
/* Metodo de change event listener
onePageHeader.addEventListener('change', async (e) => {
    const optionsChecked = {}
    console.log (e.target.id)
    console.log (e.target.value)
    console.log (e.target.checked)
    switch (e.target.checked) {  
        case true:
            console.log ("check case true", e.target.id)
            const option = optionSelector (e.target.id)
            console.log ("check option in case", option)
            Object.assign(optionsChecked, {category: option})
            
            break;
        case false:
            OptionSelector  (e.target.id)
            break;
    }
    console.log (optionsChecked)
    // queryMaker ({category: `${e.target.id}`, status, order, limit})
})
*/

// MANEJO DE EVENTOS DEL MAIN
onePageMain.addEventListener('click', async (e) => {
    console.log (e.target.value)
    console.log (e.target.value != "on") 
    if (e.target.value != undefined) {
        console.log ("entra")
        e.preventDefault();
    }
    // console.log (e.target.value)
    switch (e.target.value) {
        // Create Product
        case 'create':
            productFormManager(e.target.value, 'newProductForm');
            break;
        //Form create product
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
            let clearing = await await formFetchtData({ route: `/api/carts/658388103a44d83d3749d1d6`, method: 'DELETE' });
            console.log ("clear cart check", clearing)

            break;
        case "substract-of-cart":
            break;
        case "add-to-cart":
            const quantityNode = document.querySelector(`#quantity${e.target.parentNode.id}`)
            let data
            if (quantityNode) {
                if (quantityNode.value > 0) {
                    data = {quantity: quantityNode.value}
                }
            } 
            await formFetchtData({ route: `/api/carts/658388103a44d83d3749d1d6/product/${e.target.parentNode.id}`, info: data, method: 'PUT' });
            // socket = !undefined && socket.emit('update-product-db', 'change done');
            break;
        case "delete-of-cart":
            let deleting = await await formFetchtData({ route: `/api/carts/658388103a44d83d3749d1d6/product/${e.target.parentNode.id}`, method: 'DELETE' });
            console.log ("delete of cart check", deleting)

            break;
    }
});