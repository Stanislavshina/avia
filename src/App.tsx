import { useEffect } from 'react';
import getID from './api/api';
import Checkboxes from './components/Checkboxes/Checkboxes';
import LOGO from './asserts/logo.svg';
import './App.scss';
import Main from './components/Main';

function App() {
  useEffect(() => {
    getID();
  }, []);

  return (
    <div className="App">
      <img src={LOGO} />
      <div className="page">
        <Checkboxes />
        <Main />
      </div>
    </div>
  );
}

export default App;
