const formWindowMaker = ({ formId, parentNode, optionsObjectsArray, buttonValue, prodId }) => {
  //Seleccionar nodo padre
  const father = document.getElementById(parentNode);

  //Crear Ventana de formulario
  const windowForm = document.createElement('form');
  windowForm.className = 'form';
  windowForm.method = 'post';
  windowForm.id = formId;
  windowForm.innerHTML = `<button type="button" onClick={deleteElement(${formId})}"close">X</button>`;
  father.appendChild(windowForm);

  // Crear opciones de Menu
  optionsObjectsArray.forEach((element) => {
    const formOption = document.createElement('div');
    formOption.className = 'form__box';
    formOption.innerHTML = `
        <label for="${element.id}">${element.label}</label>
        <input type="${element.type}" name="${element.id}" id="${element.id}"">
        `;
    windowForm.appendChild(formOption);
  });

  //Crear botonera
  const button = document.createElement('button');
  button.type = `submit`;
  button.value = `${buttonValue}`;
  if (prodId) return (button.id = `${prodId}`);
  button.innerHTML = `OK`;
  windowForm.appendChild(button);
};

export default formWindowMaker;
