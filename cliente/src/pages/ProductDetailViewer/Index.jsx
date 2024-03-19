// Estilos
import './style.css';

// Importacion de componentes
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { ConteinerProductDetail, Layout } from '../../components/componentsBarrel';

const ProductDetailViewer = (props) => {
  return (
    <Layout>
      <ConteinerProductDetail />
    </Layout>
  );
};

export default ProductDetailViewer;
