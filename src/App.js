import logo from './logo.svg';
import './App.css';
import Content from './component/Content';
import { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [show, setShow] = useState(false);
  return (
    <Content/>
  );
}

export default App;
