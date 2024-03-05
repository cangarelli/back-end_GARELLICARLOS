import React from 'react';

import './App.css';
import NavegationMap from './routes/NavegationMap';
import socketRoutes from './socketConfig/socketRoutes';

function App() {
  // const [count, setCount] = useState(0)

  socketRoutes();
  return <NavegationMap />;
}

export default App;
