// Pequeño compononente: Renderizan solo un elemento sin lógica
export { default as CartWidget } from './CartWidget/CartWidget.jsx';
export { default as Title } from './Title/Title.jsx';
export { default as SubTitle } from './SubTitle/SubTitle.jsx';
export { default as Logo } from './Logo/Logo.jsx';
export { default as ButtonOption } from './ButtonOption/ButtonOption.jsx';
export { default as ButtonMain } from './ButtonMain/ButtonMain.jsx';

// Componente visual: Renderizan varios elementos sin logica de manejo de datos datos
export { default as SearchBar } from './SearchBar/SearchBar.jsx';
export { default as ProductCard } from './ProductCard/ProductCard.jsx';
export { default as ProductDetail } from './ProductDetail/ProductDetail.jsx';
export { default as ButtonPanel } from './ButtonPanel/ButtonPanel.jsx';
export { default as ChatBox } from './ChatBox/ChatBox.jsx';
export { default as CartReview } from './CartReview/CartReview.jsx';

// Componente principal: Gestionan la lógica del manejo de los datos - Aca va el fetch post/put/delete
export { default as ProductItemList } from './ProductItemList/ProductItemList.jsx';
export { default as DataForm } from './DataForm/DataForm.jsx';
export { default as Footer } from './Footer/Footer.jsx';
export { default as NavBar } from './NavBar/NavBar.jsx';

// Contenedores: Carga de datos y variables generales - Aca va el fetch get
export { default as ProductItemListConteiner } from './ProductItemListConteiner/ProductItemListConteiner.jsx';
export { default as LogDataFormConteiner } from './LogDataFormConteiner/LogDataFormConteiner.jsx';

// Otros: Funciona como pages in entre medio: Adentro contiene componentes de todas las capas
export { default as Layout } from './Layout/Layout.jsx';
