import React from 'react';

import './App.css';
import NavegationMap from './routes/NavegationMap';
import socketRoutes from './socketConfig/socketRoutes';
import { UserProvider } from './context/UserContext.jsx';
function App() {
  // const [count, setCount] = useState(0)

  socketRoutes();
  return (
    <UserProvider>
      <NavegationMap />
    </UserProvider>
  );
}

export default App;
