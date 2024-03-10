// Estilos
import './style.css';

// Importacion de componentes
import { Footer, NavBar } from '../componentsBarrel';

import React from 'react';

const Layout = (props) => {
  return (
    <div className="layout">
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
