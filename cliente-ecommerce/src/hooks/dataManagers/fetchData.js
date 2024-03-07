import React from 'react';

const fetchData = async ({ route, info, method, token }) => {
  return new Promise((resolve, reject) => {
    fetch(route, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
        credentials: 'include',
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Respuesta del servidor en ruta ${route} con method ${method} and info ${info}:`, data);
        if (data.token) {
          document.cookie = `token=${data.token}; expires=${new Date(Date.now() + 60 * 60 * 1000).toUTCString()}; path=/`
        }
        resolve(data);
      })
      .catch((error) => {
        const info = JSON.stringify(error);
        console.error('Error al enviar la solicitud:', `${info}`);
        reject(info);
      });
  });
};

export default fetchData;
