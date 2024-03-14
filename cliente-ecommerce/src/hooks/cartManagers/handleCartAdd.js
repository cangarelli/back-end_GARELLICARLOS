import { Navigate } from 'react-router-dom';
import { devHost, fetchData } from '../hooksBarrel';

const handleCartAdd = async (user, pid, cid) => {
  const res = await fetchData({
    route: `${devHost()}/api/carts/${user.CartId}/product/${pid}`,
    token: user.token,
    info: {
      quantity: 1,
    },
    method: 'PUT',
  });
  console.log('check repsonse of handleAdd', res);

  if (res.status === 'success') {
    Navigate(`/carrito/${cid}`);
  }
};

export default handleCartAdd;
