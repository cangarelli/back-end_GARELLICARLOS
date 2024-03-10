// Estilos
import "./style.css";

// Importacion de componentes
import { ProductCard } from "../componentsBarrel";

import React from "react";

const ItemListProduct = (props) => {
  //Parametros
  const { productlist } = props;

  // Logica
  // const { carrito, agregarAlCarrito, cantidadEnCarrito, precioTotal } = useContext (CartContext);

  // Renderizado
  return (
    <div className="productItemList">
      {productlist.map((product) => {
        return <ProductCard key={product._id} productData={product} />;
      })}
    </div>
  );
};

export default ItemListProduct;
