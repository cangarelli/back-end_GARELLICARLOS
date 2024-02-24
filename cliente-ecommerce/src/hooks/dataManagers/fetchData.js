import React from 'react'

const fetchData = async ({ route, info, method, token }) => {
    // console.log("Check Fetch Data Hook is method", method)
    // console.log("Check Fetch Data Hook is info", info)
    // console.log ("Check Fetch Data Hook is route", route)
    return new Promise((resolve, reject) => {
        fetch(route, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "authorization": `bearer ${token}`
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
            const info = JSON.stringify(error)
            console.error('Error al enviar la solicitud:', info);
            reject (info)
        });
    })
};

export default fetchData;