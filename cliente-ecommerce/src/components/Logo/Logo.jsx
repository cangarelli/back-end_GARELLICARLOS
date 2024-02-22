// Estilos
import "./style.css";


import React from 'react'

const Logo = (props) => {
  return (
    <img class= "logo" src={props.src} alt={props.alt} />
  )
}

export default Logo