// Estilos
import './style.css';

// Importacion de componentes
import { Footer, NavBar } from '../componentsBarrel';

const Layout = (props) => {
  return (
    <div className="layout">
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
