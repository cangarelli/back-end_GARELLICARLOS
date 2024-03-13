// Estilos
import './style.css';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { ButtonBig } from '../componentsBarrel';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { UserContext } from '../../context/UserContext';

const PadProductDetail = (props) => {
  const { stock, id } = props.data;
  const user = useContext(UserContext).user;
  console.log('check user in padProductDetail', user);
  const cartAdd = async (e) => {
    console.log('check if click', e);
    const res = await fetchData({
      route: `${devHost()}/api/carts/${user.CartId}/product/${id}`,
      token: user.token,
      info: {
        quantity: 1,
      },
      method: 'PUT',
    });
    console.log('check res of fetch in cart add', res);
  };

  const cartRemove = () => {
    console.log('route not ready');
  };

  return (
    <div className="PadProductDetail">
      <ButtonBig>
        <Link to="/">
          <RiArrowGoBackLine />
        </Link>
      </ButtonBig>

      <>
        {user.role === 'user' ? (
          <>
            <ButtonBig click={cartAdd}>Agregar al carrito</ButtonBig>
            <ButtonBig onClick={cartRemove}>Quitar del carrito</ButtonBig>{' '}
          </>
        ) : (
          <ButtonBig>
            <Link to="/loguin">Loguin</Link>
          </ButtonBig>
        )}
      </>
    </div>
  );
};

export default PadProductDetail;
