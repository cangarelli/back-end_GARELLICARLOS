const fetchData = async ({ route, info, method, token }) => {
  return new Promise((resolve, reject) => {
    fetch(route, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(info),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(`Respuesta del servidor en ruta ${route} con method ${method} and info ${info}:`, data);
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
