import React from 'react';

// Estilos
import './style.css';
import { PadCard, SubTitle, Title } from '../componentsBarrel';

const CardCartProduct = (props) => {
  const { productData } = props;

  return (
    <div className="CardCartProduct">
      <div className="CardCartProduct__infoDiv">
        <Title texto={productData.product.title} />
        <SubTitle texto={`$ ${productData.product.price}`} />
        <p>Hay {productData.quantity}</p>
        <p>Es un total de ${`${productData.product.price * productData.quantity}`}</p>
      </div>
      <PadCard />
    </div>
  );
};

export default CardCartProduct;
