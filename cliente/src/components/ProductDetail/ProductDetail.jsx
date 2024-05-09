// Estilos
import './style.css';
import { PadProductDetail, SubTitle, Title } from '../componentsBarrel';

const ProductDetail = (props) => {
  const { productInfo } = props;
  console.log('check productData of ProductDetail component', productInfo);

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
        <PadProductDetail data={{ stock: productInfo.stock, id: productInfo._id }} />
      </div>
    </div>
  );
};

export default ProductDetail;
