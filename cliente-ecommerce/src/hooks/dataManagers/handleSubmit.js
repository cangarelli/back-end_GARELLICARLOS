


import { dataUploader } from '../hooksBarrel';

const handleSubmit = (event, {dataToUpdate, fetchRoute}) => {
    event.preventDefault()
    const token = document.cookie
    const updatableData = []
    if ( typeof dataToUpdate == "object") {
        dataToUpdate.forEach(element => {
            updatableData.push(element.id)
        });
    } 
    console.log ("check updatableData of handleSubmit", updatableData)
    dataUploader ({ apiRoute: fetchRoute, method:"post", updatableData: updatableData, token})
};


export default handleSubmit