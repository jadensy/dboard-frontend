import React from 'react';
import './App.css';
import Icon from '@material-ui/core/Icon';

import Navbar from './components/Navbar.js';
import Signup from './components/Signup.js';


function App() {
  return (
    <div>
      <header className="App-header">
      <Navbar />
      <Signup />
        <Icon color="primary">star</Icon>
      </header>
    </div>
  );
}

export default App;
