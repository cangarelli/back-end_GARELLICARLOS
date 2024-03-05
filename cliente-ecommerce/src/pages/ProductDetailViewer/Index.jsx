// Estilos
import './style.css';

// Importacion de componentes
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { Layout, ProductDetail } from '../../components/componentsBarrel';

const ProductDetailViewer = (props) => {
  const { pid } = useParams();
  console.log('check pid of ProductDetailViewer component', pid);
  const [productData, setProductData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData({ route: `${devHost()}/api/products/${pid}`, method: 'GET' })
      .then((res) => {
        console.log('check res of ProductDetailViewer component', res);

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

  return <Layout>{isLoading ? <h2> Loading... </h2> : <ProductDetail productInfo={productData} />}</Layout>;
};

export default ProductDetailViewer;
