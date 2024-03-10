// Estilos
import './style.css';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { AnimationLoading, ProductDetail } from '../componentsBarrel';

const ConteinerProductDetail = (props) => {
  // Variables
  const { pid } = useParams();
  console.log('check pid of ProductDetailViewer component', pid);
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Logica de manejo de datos
  useEffect(() => {
    fetchData({ route: `${devHost()}/api/products/${pid}`, method: 'GET' })
      .then((res) => {
        if (res.status == 'success') {
          setProductData(res.payload);
          setIsLoading(false);
          console.log('check productData of ProductDetailViewer component', productData);
        }
      })
      .catch((err) => {
        console.log('check useEffect fetch of ProductItemListConteiner is err', err);
      });
  }, [pid]);
  //Renderizado
  return <div>{isLoading ? <AnimationLoading /> : <ProductDetail productInfo={productData} />}</div>;
};

export default ConteinerProductDetail;
