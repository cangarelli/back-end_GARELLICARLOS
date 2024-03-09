// Estilos
import "./style.css";

import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { CartWidget, Logo, SearchBar, SubTitle } from "../componentsBarrel";
import { devHost, fetchData } from "../../hooks/hooksBarrel";

import logoMarca from "../../assets/png/Logo-marca.png";
import { UserContext } from "../../context/UserContext.jsx";

const hostDev = "http://localhost:8080";
const NavBar = (props) => {
  // Variables
  const [categoryOptions, setCategoryOptions] = useState([]);
  //Logica
  const { getUserName, getUserCartId, getUserCartQuantitys } =
    useContext(UserContext);
  // const { userSetter } = useContext(UserContext);
  // userSetter(data.payload, data.token);
  useEffect(() => {
    // Con mi backend
    fetchData({
      route: `${devHost()}/api/products/daokeydata/category`,
      method: "get",
    }).then((res) => {
      setCategoryOptions(res.payload);
    });
  }, []);
  //Renderización
  return (
    <div className="navMarco">
      <div className="navBar">
        <div className="conteiner">
          <Link to={"/"}>
            <Logo src={logoMarca} alt="Icono de acceso a pagina princial" />
          </Link>
          <SearchBar
            categories={categoryOptions.length > 0 ? categoryOptions : [""]}
          />

          <Link to="/contacto">
            <SubTitle texto="Chat" />
          </Link>
          <Link to="/carrito">
            <CartWidget />
          </Link>
          <Link to="/loguin">
            <SubTitle texto="Loguin" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
