const serverConfig = async () => {
    // Seteo de hosts
    const developerHost = () =>{
      return "http://localhost:8080"
    } 
    const productHost = "http://localhost:4000"

    // Funciones de respaldo
    async function checkServerRoute(url) {
        try {
          const response = await fetch(url, {
            method: "HEAD", // Se usa el método HEAD para evitar modificar el servidor
            timeout: 5000, // Timeout de 5 segundos para evitar esperas largas
          });
          if (response.status === 200) {
            return true; // La ruta está activa
          } else {
            return false; // La ruta no está activa
          }
        } catch (error) {
          console.error(error); // Se imprime el error en caso de que ocurra uno
          return false; // Se considera que la ruta no está activa si hay un error
        }
      }
    // Funcion integradora
    const serverSelector = async ( ) => {
        let selectedHost 
        const developerServer =  await checkServerRoute(developerHost) 
        if (developerServer) {
            selectedHost = developerHost
        } else {
            const productServer = await checkServerRoute(productHost)
            productServer ? selectedHost = productHost : selectedHost= "Every server inactive"
        }
        return selectedHost
    } 
    return ({
        developerHost,
        productHost,
        serverSelector
    })
}

export default serverConfig
