// Estilos
import "./style.css";

// Importacion de componentes
import {
  ConteinerCartProducts,
  Layout,
} from "../../components/componentsBarrel";

import React from "react";

const CartView = () => {
  return (
    <Layout>
      <ConteinerCartProducts />
    </Layout>
  );
};

export default CartView;
