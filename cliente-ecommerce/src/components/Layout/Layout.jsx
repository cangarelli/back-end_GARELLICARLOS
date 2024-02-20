// Estilos
import "./style.css";

// Importacion de componentes
import { Footer, NavBar } from "../componentsBarrel"


export const Layout = () => {
  return (
    <div>
        <NavBar/>
            {props.children}
        <Footer/>
    </div>
  )
}
