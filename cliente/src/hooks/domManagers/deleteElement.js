const deleteElement = (id) => {
  const elementSelect = document.getElementById(id);
  elementSelect != null && elementSelect.remove();
};

export default deleteElement;
