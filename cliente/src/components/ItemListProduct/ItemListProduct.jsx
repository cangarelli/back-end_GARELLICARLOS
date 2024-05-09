// Estilos
import './style.css';

// Importacion de componentes
import { CardProduct } from '../componentsBarrel';

const ItemListProduct = (props) => {
  //Parametros
  const { productlist } = props;

  // Logica
  // const { carrito, agregarAlCarrito, cantidadEnCarrito, precioTotal } = useContext (CartContext);

  // Renderizado
  return (
    <div className="productItemList">
      {productlist.map((product) => {
        return <CardProduct key={product._id} productData={product} />;
      })}
    </div>
  );
};

export default ItemListProduct;
