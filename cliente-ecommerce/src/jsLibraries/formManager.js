// Funciones de 1ª orden para manejar el DOM
function formWindowMaker({formId, optionsObjectsArray, buttonValue, prodId}) {
    //Seleccionar nodo padre
    const father = document.getElementById('mainRoot');

    //Crear Ventana de formulario
    const windowForm = document.createElement("form")
    windowForm.className = 'form';
    windowForm.method = 'post';
    windowForm.id = formId;
    windowForm.innerHTML= `<button type="button" value="close">X</button>`
    father.appendChild(windowForm)

    // Crear opciones de Menu
    optionsObjectsArray.forEach(element => {
        const formOption = document.createElement ("div")
        formOption.className= "form__box"
        formOption.innerHTML= `
        <label for="${element.id}">${element.label}</label>
        <input type="${element.type}" name="${element.id}" id="${element.id}"">
        `
        windowForm.appendChild(formOption)
    });

    //Crear botonera
    const button = document.createElement ("button")
    button.type= `submit`
    button.value= `${buttonValue}`
    button.id= `${prodId}`
    button.innerHTML= `OK`
    windowForm.appendChild(button)
};

function deleteElement(id) {
    const elementSelect = document.getElementById(id);
    elementSelect != null && elementSelect.remove();
};

// Funcion de 2ª orden para manejar el DOM
const productFormManager = (action, id, idProd) => {
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
            deleteElement(id);
            break;
        case 'create-update':
            const existeUpdate = document.getElementById(id);
            existeUpdate === null && formWindowMaker({formId: id, optionsObjectsArray: formProductManagerObjetc, buttonValue: "update-producto",  prodId: idProd});
            break;
        case "create-user":
            const existeCreateUser = document.getElementById(id);
            existeCreateUser === null && formWindowMaker ({formId: id, optionsObjectsArray: formUserCreateObjetc, buttonValue: "create-user"});
            break;
    }
};

// Funcion de 3º orden para procesar la información
const formDataManager = (nodos) => {
    const dataSource = nodos.reduce((obj, nodo) => {
        const mark = document.getElementById(nodo);
        if (mark.value) {
            obj[nodo] = mark.value;
        }
        return obj;
    }, {});
    return dataSource;
};

// Funciones de 4º orden para enviar la información
async function formFetchtData({ route, info, method, header }) {
    console.log(method)
    console.log(info)
    console.log ("form fetch route", route)
    return new Promise((resolve, reject) => {
        fetch(route, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "authorization": ((header)=>{
                if (header) {
                    return (localStorage.getItem("token"))
                } else{
                    return (null)
                }
            })()
        },
        body: JSON.stringify(info),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Respuesta del servidor:', data);
            resolve (data)
            // CHEQUEO RESPUESTA DEL SERVER
        })
        .catch((error) => {
            console.error('Error al enviar la solicitud:', error);
            reject (error)
        });
    })
};

async function upLoadData({ apiRoute, method, formId, updatableData}) {
    const updateData = formDataManager(updatableData);
    const response = await formFetchtData({ route: apiRoute, info: updateData, method: method });
    formId && deleteElement(formId);
    return response
};