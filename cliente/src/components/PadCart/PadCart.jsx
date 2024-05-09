// Estilos
import './style.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { UserContext } from '../../context/UserContext';
import { ButtonBig } from '../componentsBarrel';

const PadCart = (props) => {
  const { productSetter } = props;
  const user = useContext(UserContext).user;

  const handleEmptyCart = () => {
    fetchData({
      route: `${devHost()}/api/carts/${user.CartId}`,
      method: 'PUT',
      token: user.token,
    }).then((res) => {
      if (res.status === 'success') {
        productSetter(0);
      }
    });
  };

  return (
    <div>
      <ButtonBig>
        <Link to={'/checkout'}>Comprar</Link>
      </ButtonBig>
      <ButtonBig click={handleEmptyCart}> Vaciar carrito</ButtonBig>
    </div>
  );
};

export default PadCart;
