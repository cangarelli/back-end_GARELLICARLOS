import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { ButtonBig } from '../componentsBarrel';
import { devHost, fetchData } from '../../hooks/hooksBarrel';

const PadCardCart = (props) => {
  const user = useContext(UserContext).user;
  const { quantityGetter, quantitySetter, pid } = props;

  const handleCartAdd = async () => {
    const res = await fetchData({
      route: `${devHost()}/api/carts/${user.CartId}/product/${pid}`,
      token: user.token,
      info: {
        quantity: 1,
      },
      method: 'PUT',
    });
    if (res.status === 'success') {
      quantitySetter(quantityGetter + 1);
    }
  };

  const handleRemove = async () => {
    const res = await fetchData({
      route: `${devHost()}/api/carts/${user.CartId}/product/${pid}`,
      token: user.token,
      method: 'DELETE',
    });
    if (res.status === 'success') {
      quantitySetter(0);
    }
  };
  const handleSubstract = async () => {
    const res = await fetchData({
      route: `${devHost()}/api/carts/${user.CartId}/product/${pid}`,
      token: user.token,
      info: {
        quantity: -1,
      },
      method: 'PUT',
    });
    if (res.status === 'success') {
      quantitySetter(quantityGetter - 1);
    }
  };
  return (
    <div>
      <ButtonBig click={handleCartAdd}>Agregar más</ButtonBig>
      <ButtonBig click={handleRemove}>Quitar del carrito</ButtonBig>
      <ButtonBig click={handleSubstract}>Remover uno</ButtonBig>
    </div>
  );
};

export default PadCardCart;
