// Estilos
import "./style.css";

import React from 'react'
import { DataForm } from '../componentsBarrel'
import { devHost, handleSubmit } from '../../hooks/hooksBarrel'

const LogDataFormConteiner = (props) => {
  const { path } = props
  const dataLoguinQuestions =[        
    {type: "email", id: "email", label:"Coreo electronico:", placeholder: "Inclui el @" },
    {type: "password", id: "password", label:"Crea tu contraseña:", placeholder: "Top secret"}
    ]
  const loguinAlternativesArray =[
    { type: "button", label: "Enviar", link: null, onClick: handleSubmit },
    { type: "button", label: "Registrarme", link: "/register", onClick: null }

  ]
  const dataRegisterQuestions =[
    {type: "text", id: "lastName", label:"Apellido:", placeholder: "Escribi tu apelllido"},
    {type: "text", id: "firstName", label:"Nombre:", placeholder: "Escribi tu nombre" },
    {type: "number", id: "age", label:"Edad:", placeholder: ""},
    {type: "email", id: "email", label:"Coreo electronico:", placeholder: "Inclui el @" },
    {type: "password", id: "password", label:"Crea tu contraseña:", placeholder: "Top secret"},
  ]
  const registerAlternativesArray = [
    { type: "submit", label: "Enviar", link: null },
    { type: "button", label: "Loguin", link: "/loguin" }
  ]

  return (
    <div className='LogDataFormConteiner'>
      {path == "loguin"? 
        <DataForm 
          fetchRoute= {`${devHost()}/api/sessions/loguin`} 
          dataQuestions={dataLoguinQuestions} 
          buttonsOption={loguinAlternativesArray}
        />
      :
        <DataForm 
          fetchRoute= {`${devHost()}/api/sessions/register`} 
          dataQuestions={dataRegisterQuestions} 
          buttonsOption={registerAlternativesArray}
        />
      }
    </div>
  )
}

export default LogDataFormConteiner