import React from 'react';

// Estilos
import './style.css';
import { ButtonPanel, SubTitle, Title } from '../componentsBarrel';

const ProductDetail = (props) => {
  const { productInfo } = props;
  console.log('check productData of ProductDetail component', productInfo);
  // Logica para botonera

  const buttonsData = [
    { onclick: '', value: 'addProduct', modo: 'option', media: '' },
    { onclick: '', value: 'removeProduct', modo: 'option', media: '' },
    { onclick: '', value: 'Purchase', modo: 'option', media: '' },
    { onclick: '', value: 'Voler', modo: 'option', media: '' },
  ];

  return (
    <div className="productBox">
      <div className="productDetail">
        <img src={productInfo.thumbnail} alt={`Imagen de ${productInfo.title}`} />
        <div className="__infoBox">
          <Title texto={productInfo.title} />
          <SubTitle texto={`$ ${productInfo.price}`} />
          <SubTitle texto={productInfo.description} />
          <p>{`Quendan ${productInfo.stock}`}</p>
        </div>
        <ButtonPanel buttons={buttonsData} />
      </div>
    </div>
  );
};

export default ProductDetail;
