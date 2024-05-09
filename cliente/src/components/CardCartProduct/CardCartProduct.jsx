import { useState } from 'react';

// Estilos
import './style.css';
import { PadCardCart, SubTitle, Title } from '../componentsBarrel';

const CardCartProduct = (props) => {
  const { productData } = props;
  const [quantity, setQuantity] = useState(productData.quantity);
  return (
    <div className="CardCartProduct">
      {quantity > 0 ? (
        <>
          {' '}
          <div>
            <Title texto={productData.product.title} />
            <SubTitle texto={`$ ${productData.product.price}`} />
            <p>Hay {quantity}</p>
            <p>Es un total de ${`${productData.product.price * productData.quantity}`}</p>
          </div>
          <PadCardCart pid={productData.product._id} quantitySetter={setQuantity} quantityGetter={quantity} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardCartProduct;
