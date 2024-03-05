// Estilos
import './style.css';

// Importacion de componentes
import { Layout, ProductItemListConteiner } from '../../components/componentsBarrel';

import React from 'react';

const Home = () => {
  return (
    <Layout>
      <ProductItemListConteiner />
    </Layout>
  );
};

export default Home;
