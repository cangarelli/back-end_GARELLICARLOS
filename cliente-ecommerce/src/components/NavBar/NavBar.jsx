// Estilos
import './style.css';

// Componentes de react
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

// Componentes propios
import { Logo, SearchBar, PadUser } from '../componentsBarrel';
import { devHost, fetchData } from '../../hooks/hooksBarrel';
import { UserContext } from '../../context/UserContext.jsx';

// Assets
import logoMarca from '../../assets/png/Logo-marca.png';

const hostDev = 'http://localhost:8080';
const NavBar = (props) => {
  // Variables
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [UData, setUData] = useState({});
  const { user } = useContext(UserContext);

  // Gestión de datos de session
  useEffect(() => {
    let userInfo;
    if (user && user.Uid) {
      userInfo = {
        uId: user.Uid,
        cart: user.cartId,
        name: user.name,
      };
    } else {
      userInfo = null;
    }
    setUData(userInfo);
  }, [user]);

  // Gestion de datos Search Bar
  useEffect(() => {
    // Con mi backend
    fetchData({
      route: `${devHost()}/api/products/daokeydata/category`,
      method: 'get',
    }).then((res) => {
      setCategoryOptions(res.payload);
    });
  }, []);

  //Renderización
  return (
    <div className="navBar">
      <div className="navBar__conteiner">
        <Link to={'/'}>
          <Logo src={logoMarca} alt="Icono de acceso a pagina princial" />
        </Link>
        <SearchBar categories={categoryOptions.length > 0 ? categoryOptions : ['']} />
        <PadUser userData={UData} />
      </div>
    </div>
  );
};

export default NavBar;
