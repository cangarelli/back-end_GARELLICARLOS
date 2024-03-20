// Estilos
import './style.css';

// Componentes de react
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRocketchat } from 'react-icons/fa';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
//Componentes propios
import { UserContext } from '../../context/UserContext';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { CartWidget, SubTitle } from '../componentsBarrel';

const PadUser = (props) => {
  const { userData } = props;
  const { user, setUser } = useContext(UserContext);

  const logOut = async () => {
    const response = await fetchData({
      route: `${devHost()}/api/sessions/logout`,
      method: 'delete',
      token: user.token,
    });
    if (response && response.status === 'success') {
      setUser({});
    }
  };

  return (
    <div className="UserPad">
      {userData === null ? (
        <Link to="/loguin">
          <AiOutlineLogin className="UserPad__logedOptions--optWidget" />
        </Link>
      ) : (
        <div className="UserPad__logedOptions">
          <SubTitle texto={`Bienvenido ${userData.name}`} />
          <Link className="UserPad__logedOptions--opt" to={`/userprofile/${userData.uId}`}>
            <FaUserCircle className="UserPad__logedOptions--optWidget" />
          </Link>
          <Link className="UserPad__logedOptions--opt" to={`/contacto/${userData.uId}`}>
            <FaRocketchat className="UserPad__logedOptions--optWidget" />
          </Link>
          <Link className="UserPad__logedOptions--opt" to={`/carrito/${userData.cart}`}>
            <CartWidget />
          </Link>
          <div className="UserPad__logedOptions--opt" onClick={logOut}>
            <AiOutlineLogout className="UserPad__logedOptions--optWidget" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PadUser;
