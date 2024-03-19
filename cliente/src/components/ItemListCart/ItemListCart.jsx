// Estilos
import { CardCartProduct, PadCart, SubTitle } from '../componentsBarrel';
import './style.css';

import React, { useState } from 'react';

const ItemListCart = (props) => {
  const { cData } = props;
  const [productQuantity, setProductQuantity] = useState(cData.products.length);
  return (
    <div>
      {productQuantity > 0 ? (
        <>
          <div>
            {cData.products.map((product) => {
              return <CardCartProduct key={product._id} productData={product} />;
            })}
          </div>
          <PadCart productSetter={setProductQuantity} />
        </>
      ) : (
        <SubTitle texto="No ha agregado ningun producto al carrito" />
      )}
    </div>
  );
};

export default ItemListCart;
