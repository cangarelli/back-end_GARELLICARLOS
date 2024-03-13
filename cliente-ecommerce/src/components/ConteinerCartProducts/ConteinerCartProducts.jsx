// Estilos
import './style.css';

// Componentes de react
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Componentes propios
import { UserContext } from '../../context/UserContext';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { AnimationLoading, ItemListCart } from '../componentsBarrel';

const ConteinerCartProducts = (props) => {
  // Variables
  const [uCart, setUCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { cid } = useParams();
  const user = useContext(UserContext);

  // Logica de manejo de datos
  useEffect(() => {
    fetchData({
      route: `${devHost()}/api/carts/${cid}`,
      method: 'GET',
      token: user.user.token,
    }).then((res) => {
      setUCart(res.payload);
      setIsLoading(false);
    });
  }, []);

  //Renderizado
  return <div>{isLoading ? <AnimationLoading /> : <ItemListCart cData={uCart} />}</div>;
};

export default ConteinerCartProducts;
