//Importación de modulos de terceros
const socket = io();

socket.emit('upLoadFormData', 'aca va la data que se envia');

// Importacion de modulos porpios
const { productFormManager, formDataManager, formPostData } = require ('./formManager.js') ;

const onePage = document.getElementById('root');
onePage.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target.value);
    switch (e.target.value) {
        case 'create':
            productFormManager(e.target.value);
            break;
        case 'close':
            productFormManager(e.target.value);
            break;
        case 'Cargar producto':
            const nodos = ['title', 'price', 'description', 'stock', 'code'];
            const loadingProduct = formDataManager(nodos);
            formPostData ('/api/products/', loadingProduct)
            break;
    }
});

// const productName = document.getElementById("title")
// const productPrice = document.getElementById("price")
// const productStock = document.getElementById("stock")
// const productDescription = document.getElementById("description")
// const productCode = document.getElementById("code")

// {title: productName.value , price: productPrice.value, stock: productStock.value}
