import { deleteElement, formWindowMaker } from '../hooksBarrel.js';

const formController = (action, parentNode, idForm, idProd) => {
  const formUserCreateObjetc = [
    { type: 'text', id: 'name', label: 'Nombre' },
    { type: 'text', id: 'lastName', label: 'Apelido' },
    { type: 'email', id: 'email', label: 'Coreo electronico' },
    { type: 'password', id: 'password', label: 'Crea tu contraseña' },
  ];
  const formProductManagerObjetc = [
    { type: 'text', id: 'title', label: 'Ingresa el nombre del producto' },
    { type: 'number', id: 'price', label: 'Ingresa el precio del producto' },
    { type: 'text', id: 'category', label: 'Ingresa la categoria del tu producto' },
    { type: 'text', id: 'description', label: 'Describi brevemente el producto' },
    { type: 'number', id: 'stock', label: 'Stock' },
    { type: 'text', id: 'code', label: 'Ingresa el codigo del producto' },
    { type: 'text', id: 'thumbnail', label: 'Ingresa la ruta a una img del producto' },
  ];
  console.log('check parametros of formController', action, parentNode, idForm, idProd);
  switch (action) {
    case 'create':
      const existe = document.getElementById(idForm);
      existe === null &&
        formWindowMaker({
          formId: idForm,
          optionsObjectsArray: formProductManagerObjetc,
          buttonValue: 'cargar-producto',
        });
      break;
    case 'close':
      deleteElement(idForm);
      break;
    case 'create-update':
      const existeUpdate = document.getElementById(idForm);
      existeUpdate === null &&
        formWindowMaker({
          formId: idForm,
          optionsObjectsArray: formProductManagerObjetc,
          buttonValue: 'update-producto',
          prodId: idProd,
        });
      break;
    case 'register-user':
      const existParent = document.getElementById(parentNode);
      console.log('check parent node', existParent);

      const existCreateUser = document.getElementById(idForm);
      existCreateUser === null &&
        formWindowMaker({
          formId: idForm,
          parentNode,
          optionsObjectsArray: formUserCreateObjetc,
          buttonValue: action,
        });
      break;
  }
};

export default formController;
