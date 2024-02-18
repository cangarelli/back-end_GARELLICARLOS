import { Footer } from "../footer/footer"
import { NavBar } from "../navBar/navBar"

export const Layout = () => {
  return (
    <div>
        <NavBar/>
            {props.children}
        <Footer/>
    </div>
  )
}
