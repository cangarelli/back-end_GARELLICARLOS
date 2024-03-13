// Estilos
import { CardCartProduct, PadCart } from '../componentsBarrel';
import './style.css';

import React from 'react';

const ItemListCart = (props) => {
  const { cData } = props;

  return (
    <div>
      <div>
        {cData.products.map((product) => {
          return <CardCartProduct key={product._id} productData={product} />;
        })}
      </div>
      <PadCart />
    </div>
  );
};

export default ItemListCart;
