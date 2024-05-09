// Compnentes de React
import { Link } from 'react-router-dom';

// Estilos
import './style.css';

// Importacion de componentes
import { SubTitle, Title } from '../componentsBarrel';

const CardProduct = (props) => {
  const { productData } = props;
  // console.log ("check productData of ProductCard component", productData)

  return (
    <div className="card">
      <img className="--img" src={productData.thumbnail} alt="ilustración de producto" />
      <div className="__infoDiv">
        <Title texto={productData.title} />
        <SubTitle texto={`$ ${productData.price}`} />
        <p>Quendan {productData.stock}</p>
      </div>
      <Link to={`/item/${productData._id}`} className="--verDetalleButton">
        Ver detalle
      </Link>
    </div>
  );
};

export default CardProduct;
