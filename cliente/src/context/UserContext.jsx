// Componentes de React
import { createContext, useEffect, useState } from 'react';

//Componentes propios

export const UserContext = createContext();

export const UserProvider = (props) => {
  // Parametros
  const [user, setUser] = useState({});

  // Logica
  const userSetter = (logData) => {
    console.log('check params of userProvider is userSetter', logData);
    const { payload, token } = logData;

    const userObject = {
      Uid: payload.id,
      cartId: payload.cartId,
      email: payload.email,
      name: payload.full_name,
      role: payload.role,
      token,
    };
    setUser(userObject);
  };

  useEffect(() => {
    console.log('check user in userSetter of User Povider Context', user);
  }, [user]);
  // Renderizado
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userSetter,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
