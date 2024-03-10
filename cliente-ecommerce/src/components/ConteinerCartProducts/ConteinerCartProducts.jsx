// Estilos
import "./style.css";
import { UserContext } from "../../context/UserContext";
import { fetchData } from "../../hooks/hooksBarrel";

import { useContext, useEffect, useState } from "react";

const ConteinerCartProducts = (props) => {
  const [uCart, setUCart] = useState({});

  const data = useContext(UserContext);
  useEffect(() => {
    fetchData;
  }, []);

  return <div></div>;
};

export default ConteinerCartProducts;
