// Estilos
import "./style.css";

// Componentes de react
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Componentes propios
import { UserContext } from "../../context/UserContext";
import { devHost, fetchData } from "../../hooks/hooksBarrel";
import { AnimationLoading, ItemListCart } from "../componentsBarrel";

const ConteinerCartProducts = (props) => {
  const [uCart, setUCart] = useState({});
  const { cid } = useParams();
  const user = useContext(UserContext);
  useEffect(() => {
    fetchData({
      route: `${devHost()}/api/carts/${queryString}`,
      method: "GET",
      token,
    });
  }, []);

  //Renderizado
  return (
    <div>
      {isLoading ? <AnimationLoading /> : <ItemListCart cData={uCart} />}
    </div>
  );
};

export default ConteinerCartProducts;
