// Modulos de REACT
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Modulos Propios
import Home from '../pages/Home/Index.jsx';
import ProductDetailViewer from '../pages/ProductDetailViewer/Index.jsx';
import ChatView from '../pages/ChatView/Index.jsx';
import Loguin from '../pages/Loguin/Index.jsx';
import CartView from '../pages/CartView/Index.jsx';
import CheckOut from '../pages/CheckOut/Index.jsx';
import Register from '../pages/Register/Index.jsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/item/:pid',
    element: <ProductDetailViewer />,
  },
  {
    path: '/contacto/:uid',
    element: <ChatView />,
  },
  {
    path: '/loguin',
    element: <Loguin />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/carrito/:cid',
    element: <CartView />,
  },
  {
    path: '/checkout',
    element: <CheckOut />,
  },
]);

// Componente
const NavegationMap = () => {
  return <RouterProvider router={routes} />;
};

export default NavegationMap;
