import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

// import materialUI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
// import components
import Navbar from './components/Navbar.js';
import Profile from './pages/Profile.js'
// import Dashboard from './pages/Dashboard.js'
import Projects from './pages/Projects.js'
// import Profile from './pages/Profile.js'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#38786a',
      main: '#004c3f',
      dark: '#002419',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffcccb',
      main: '#ef9a9a',
      dark: '##ba6b6c',
      contrastText: '#000000',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: "'Roboto', sans-serif",
    fontSize: 12,
    textTransform: "none",
  }
});

function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <header className="App-header">
          <Navbar />
          {/* <Icon color="primary">star</Icon> */}
        </header>
      </MuiThemeProvider>
      <Route path="/profile" component={Profile} />
      <Route path="/projects" component={Projects} />
    </div>
  );
}

export default App;
