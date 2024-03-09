// Estilos
import "./style.css";

// Componentes de react
import React, { useContext } from "react";
import { Link } from "react-router-dom";

//Componentes propios
import { UserContext } from "../../context/UserContext";
import { devHost, fetchData } from "../../hooks/hooksBarrel";
import { CartWidget, SubTitle } from "../componentsBarrel";

const UserPad = (props) => {
  const { userData } = props;
  const { user, setUser } = useContext(UserContext);

  const logOut = async () => {
    const response = await fetchData({
      route: `${devHost()}/api/sessions/logout`,
      method: "delete",
      token: user.token,
    });
    if (response && response.status === "success") {
      setUser({});
    }
  };

  return (
    <div>
      {userData === null ? (
        <Link to="/loguin">
          <SubTitle texto="Loguin" />
        </Link>
      ) : (
        <div>
          <Link to={`/contacto/${userData.uId}`}>
            <SubTitle texto="Chat" />
          </Link>
          <Link to={`/carrito/${userData.cart}`}>
            <CartWidget />
          </Link>
          <button onClick={logOut}>
            <SubTitle texto="Logout" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPad;
