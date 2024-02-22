// Estilos
import "./style.css";

// Importacion de componentes
import { ProductCard } from "../componentsBarrel";


import React from 'react'

const ProductItemList = (props) => {
    //Parametros
    const {productlist} = props;
  
    // Logica
    const { carrito, agregarAlCarrito, cantidadEnCarrito, precioTotal } = useContext (CartContext);
  
    // Renderizado
    return (
      <div className='itemList'>
        {productlist.map((producto) => {
          
          return (
            <ProductCard id={producto.id} producto={producto}/>
          )
        })}
      </div>
    ) 
}

export default ProductItemList