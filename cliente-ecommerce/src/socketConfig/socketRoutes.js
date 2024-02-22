import io from 'socket.io-client';
import { devHost } from '../hooks/hooksBarrel';
// import io from "/socket.io/socket.io.js"

const socketRoutes = () => {
    // let socket;
    console.log ("check io object",io())
    let socket = io('http://localhost:8080/')
    socket.emit('conection', 'client connected');
    // socket.on('update-productList', (data) => {
    //     console.log('actualizando pagina');
    //     window.location.href = `/views/products`;
    // });
    // socket.on("update-chat", async data => {
        
    //     const chatBox = document.querySelector(".chat__box")
    //     chatBox.innerHTML = ""
    //     console.log ("check chat event listener is returned data",data)
    //     data.forEach(messageElement => {
    //         const messageLine = document.createElement ("div")
    //         messageLine.className ="chat__box--userMessage"
    //         messageLine.innerHTML = `
    //         <p>${messageElement.userMail}:</p>
    //         <p>${messageElement.message} </p>`
    //         chatBox.appendChild(messageLine)
    //     })
    // })
}

export default socketRoutes