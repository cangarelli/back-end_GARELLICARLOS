// Estilos
import './style.css';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsCartX } from 'react-icons/bs';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { UserContext } from '../../context/UserContext';

const PadCart = (props) => {
  const user = useContext(UserContext);

  const handleClick = () => {
    fetchData({
      route: `${devHost()}/api/carts/${user.CartId}/product/:pid`,
      method: 'DELETE',
      token: user.token,
    });
  };

  return (
    <div>
      <button>
        <Link to={'/checkout'}>Comprar</Link>
      </button>
      <button>
        <BsCartX onClick={handleClick} />
      </button>
    </div>
  );
};

export default PadCart;
