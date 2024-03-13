// Estilos
import './style.css';

import React from 'react';

const ButtonBig = (props) => {
  return (
    <>
      {props.inactive ? (
        <button className="buttonBig" disabeld>
          {props.children}
        </button>
      ) : (
        <button onClick={props.click} className="buttonBig">
          {props.children}
        </button>
      )}
    </>
  );
};

export default ButtonBig;
