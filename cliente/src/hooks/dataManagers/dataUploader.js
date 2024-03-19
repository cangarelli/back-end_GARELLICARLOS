import { deleteElement, fetchData, formProcesor } from '../hooksBarrel';

const dataUploader = async ({ apiRoute, method, formId, updatableData, token }) => {
  const updateData = formProcesor(updatableData);
  console.log('check updateData of data Uploader', updateData);
  const response = await fetchData({ route: apiRoute, info: updateData, method: method, token });
  updatableData.forEach((element) => {
    let mark = document.getElementById(element);
    mark.value = '';
  });
  formId && deleteElement(formId);
  return response;
};

export default dataUploader;
