// Estilos
import "./style.css";

// Importacion de componentes
import { ButtonPanel, ProductItemList } from "../componentsBarrel";


export const ProductItemListConteiner = (props) => {
    const [ productos, setProductos ] = useState ([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      // Parametros
      const refProductos = collection(db, "productos");
      const refCategory = id ? query (refProductos, where("categoria", "==", id)) : refProductos
  
      //Fetch
      getDocs (refCategory)
          .then((res) => {
              setIsLoading(false);       
              setProductos (res.docs.map((doc) => {return {...doc.data(), id: doc.id };}));
          })
          .catch ((err) => {
              setIsLoading(false);
              console.log (err)
          })       
  }, [id]);
  
  // Renderización  de componente
  
    return (
      <div>
        <ButtonPanel/>
        {isLoading ? 
          <h2> CARGANDO... </h2> 
          : 
          <ProductItemList productlist = {productos}/>
        }
      </div>
    )
}
