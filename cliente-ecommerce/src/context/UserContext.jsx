// Componentes de React
import { createContext, useState } from 'react';

//Componentes propios

export const UserContext = createContext();

export const UserProvider = (props) => {
  // Parametros
  const [user, setUser] = useState([]);

  // Logica
  // User
  const userSetter = (userData, token) => {
    setUser(...token, userData);
    console.log('check user in userSetter of User Povider Context', user);
  };
  const getUserName = () => {
    
  };

  //Carrito of user
  const getUserCartId = () => {};
  const getUserCartQuantitys = () => {};
  const tokenManager = () => {};

  // Renderizado
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userSetter,
        getUserName,
        getUserCartId,
        getUserCartQuantitys,
        tokenManager,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
