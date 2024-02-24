import React, { useState } from 'react'

// Estilos
import "./style.css";
import { dataUploader, devHost, fetchData, formController } from '../../hooks/hooksBarrel.js';
import { dv } from '@faker-js/faker';

const LoguinForm = () => {
    // Parametros
    
    const [valores, setValores] = useState({
        password: "",
        email: ""
    });
    const dataAsker =["password", "email"]
    // Logica 
    const handleSubmit = (e) => {
        e.preventDefault (); 
        const token = document.cookie
        // fetchData({ route:`${devHost()}/api/sessions/loguin`, info: valores, method:"post", token})
        console.log ("check valores", valores)
        dataUploader ({ apiRoute: `${devHost()}/api/sessions/loguin`, method:"post", updatableData:dataAsker}) 
          .then((res) =>{
            console.log (res)
            // setValores ({
            //     password: "",
            //     email: ""
            // })
          })
          .catch(err => {
            console.log (err)
          })
    };

    const handleForm = (e) => {
        setValores ({
            ...valores,
            [e.target.name]: e.target.value
        });
    };

    // Renderizado


  return (
    <form className='form' onSubmit={handleSubmit}>
        {dataAsker.map((nodo)=> {
            return <input type={nodo} className='input' id={nodo} name= {nodo} placeholder={`Escribi tu ${nodo}`} />
        })
        }
        {/* <input type="email" className='input' id=  name='email' onChange={handleForm} placeholder='Escribi tu email' />
        <input type="password" className='input' id= "password" name='password' onChange={handleForm} placeholder='Escribi tu contraseña' /> */}
        <button className='enviar' type='submit'>Enviar</button>

        <button type="button" onClick={formController("register-user", "formularioDeRegistro")}>Registrarme</button>
    </form>    
  )
}

export default LoguinForm