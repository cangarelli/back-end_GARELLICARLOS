import React from 'react'


// Estilos
import "./style.css";
import { ButtonMain, ButtonOption } from '../componentsBarrel';

const ButtonPanel = (props) => {
  const { buttons } = props

  return (
    <div className='buttonPanel'>
      {buttons.map(buttonInfo => {
        if (buttonInfo.modo === "main") {
          return <ButtonMain />
        } else {
          return <ButtonOption buttonData = {buttonInfo} />
        }
      })}

    </div>
  )
}

export default ButtonPanel

