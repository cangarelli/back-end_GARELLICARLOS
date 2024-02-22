// Estilos
import "./style.css";

// Importacion de componentes
import { ButtonPanel, ProductItemList } from "../componentsBarrel";


import React, { useEffect, useState } from 'react'

const ProductItemListConteiner = (props) => {
  const [ productos, setProductos ] = useState ([])
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
  }, []);

  // Renderización  de componente

  return (
    <div>
      <ButtonPanel/>
      {isLoading ? 
        <h2> CARGANDO... </h2> 
        : 
        <ProductItemList productlist = {productos}/>
      }
    </div>
  )
}

export default ProductItemListConteiner