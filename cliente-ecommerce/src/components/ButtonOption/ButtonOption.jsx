import React from 'react'

// Estilos
import "./style.css"

const ButtonOption = (props) => {
  return (
    <input class= "optionButton" type="button" value={props.value} />  
  )
}


export default ButtonOption