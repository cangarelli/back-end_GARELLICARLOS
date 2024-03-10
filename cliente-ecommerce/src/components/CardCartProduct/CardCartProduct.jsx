import React from 'react';

// Estilos
import './style.css';
import { PadCard, SubTitle, Title } from '../componentsBarrel';

const CardCartProduct = (props) => {
  const { productData } = props;
  console.log('check cData of CartReview Componente');

  return (
    <div className="card">
      <div className="__infoDiv">
        <Title texto={productData.title} />
        <SubTitle texto={`$ ${productData.price}`} />
        <p>Hay {productData.quantity}</p>
        <p>Es un total de ${`${productData.price * productData.quantity}`}</p>
      </div>
      <PadCard />
    </div>
  );
};

export default CardCartProduct;
