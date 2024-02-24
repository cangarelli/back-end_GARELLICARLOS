import {deleteElement, formWindowMaker} from '../hooksBarrel.js';

const formController = (action, id, idProd) => {
    const formUserCreateObjetc = [
        {type: "text", id: "name",  label:"Nombre"},
        {type: "text", id: "lastName",  label:"Apelido"},
        {type: "email", id: "email", label:"Coreo electronico"},
        {type: "password", id: "password", label:"Crea tu contraseña"},
    ]
    const formProductManagerObjetc = [ 
        {type: "text", id: "title", label: "Ingresa el nombre del producto"},
        {type: "number", id: "price", label: "Ingresa el precio del producto"},
        {type: "text", id: "category", label: "Ingresa la categoria del tu producto"},
        {type: "text", id: "description", label: "Describi brevemente el producto"},
        {type: "number", id: "stock", label: "Stock"},
        {type: "text", id: "code", label: "Ingresa el codigo del producto"},
        {type: "text", id: "thumbnail", label: "Ingresa la ruta a una img del producto"},
    ]
    
    switch (action) {
        case 'create':
            const existe = document.getElementById(id);
            existe === null && formWindowMaker({formId: id, optionsObjectsArray: formProductManagerObjetc, buttonValue: "cargar-producto"});
            break;
        case 'close':
            deleteElement (id);
            break;
        case 'create-update':
            const existeUpdate = document.getElementById(id);
            existeUpdate === null && formWindowMaker({formId: id, optionsObjectsArray: formProductManagerObjetc, buttonValue: "update-producto",  prodId: idProd});
            break;
        case "register-user":
            const existeCreateUser = document.getElementById(id);
            existeCreateUser === null && formWindowMaker ({formId: id, optionsObjectsArray: formUserCreateObjetc, buttonValue: action });
            break;
    }
}

export default formController