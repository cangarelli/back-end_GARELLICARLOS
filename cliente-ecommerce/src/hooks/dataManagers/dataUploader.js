import { deleteElement, fetchData, formProcesor } from "../hooksBarrel";

const dataUploader = async ({ apiRoute, method, formId, updatableData}) => {
    const updateData = formProcesor(updatableData);
    const response = await fetchData({ route: apiRoute, info: updateData, method: method });
    updatableData.forEach(element => {
        let mark = document.getElementById(element);
        mark.value = ""
    });
    formId && deleteElement(formId);
    return response
}

export default dataUploader