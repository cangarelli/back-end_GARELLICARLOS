// Estilos
import "./style.css";

// Importacion de componentes
import { ButtonPanel, ProductItemList } from "../componentsBarrel";


import React, { useEffect, useState } from 'react'
import { devHost, fetchData } from "../../hooks/hooksBarrel";

const ProductItemListConteiner = (props) => {
  const [ productos, setProductos ] = useState ([])
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = document.cookie
    console.log ("check useEffect fetch of ProductItemListConteiner is token", token)
    
    fetchData({ route: `${devHost()}/api/products/`,  method: "GET", token })
      .then( res=>{
        console.log ("check useEffect fetch of ProductItemListConteiner is res", res)
        if (res.status == "success") {
          setProductos(res.payload)
          setIsLoading(false)
        }  
      }). catch (err =>{
        console.log ("check useEffect fetch of ProductItemListConteiner is err", err)
      })
  }, []);

  // Renderización  de componente

  return (
    <div>
      {/* <ButtonPanel/> */}
      {isLoading ? 
        <h2> CARGANDO... </h2> 
        : 
        // <h2> No esta cargando ya</h2>
        <ProductItemList productlist = {productos.docs}/>
      }
    </div>
  )
}

export default ProductItemListConteiner