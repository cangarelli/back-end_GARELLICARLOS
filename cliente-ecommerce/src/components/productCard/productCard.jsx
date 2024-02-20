// Compnentes de React
import { Link } from 'react-router-dom';

// Estilos
import "./style.css";

// Importacion de componentes
import { SubTitle, Title } from "../componentsBarrel";

export const ProductCard = (props) => {
  const { producto, id } = props
  const {stock, descripcion, imagen, precio, categoria, titulo } = producto

  return (
    <div className= "card">
      <img className= "--img" src={imagen} alt="ilustración de producto" />
      <div className="__infoDiv">
        <Title texto= {titulo} />
        <SubTitle texto= {`$ ${precio}`}/>
        <p>Quendan {stock}</p>
      </div>  
      <Link to={`/item/${id}`} className= "--verDetalleButton">Ver detalle</Link>
    </div>
  );
}
