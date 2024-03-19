import React from 'react';
import { BsCart } from 'react-icons/bs';

// Estilos
import './style.css';

const CartWidget = (props) => {
  const cartQuantity = props;
  return (
    <div className="widgetConteiner">
      <BsCart className="widgetConteiner--cartWidget" />
      {cartQuantity > 0 && <p className="widgetConteiner--quantitys">{cartQuantity}</p>}
    </div>
  );
};

export default CartWidget;
