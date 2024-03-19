// Estilos
import './style.css';

// Importacion de componentes
import { Layout, ConteinerProductItemList } from '../../components/componentsBarrel';

import React from 'react';

const Home = () => {
  return (
    <Layout>
      <ConteinerProductItemList />
    </Layout>
  );
};

export default Home;
