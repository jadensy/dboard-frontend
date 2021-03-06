import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

// import materialUI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

// import components
import Navbar from './components/Navbar.js';
import Profile from './pages/Profile.js'
import Dashboard from './pages/Dashboard.js'
import Splash from './pages/Splash.js'
import Projects from './pages/Projects.js'
import EditProject from './pages/EditProject.js'
import Clients from './pages/Clients.js'

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
  },
});

function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <header className="App-header">
          <Navbar />
        </header>
      </MuiThemeProvider>


      <Route exact path="/" component={Splash} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/projects" component={Projects} />
      <Route path="/projects/:id" component={EditProject} />
      <Route path="/clients" component={Clients} />
    </div>
  );
}

export default App;
