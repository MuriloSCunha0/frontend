import React from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ArenaForm from './pages/ArenaForm';
import AdminPage from './pages/AdminPage';
import Calendar from './pages/Calendar';
import Sidebar from './components/Sidebar';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Navigate>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/arena/new" component={ArenaForm} />
              <Route path="/admin" component={AdminPage} />
              <Route path="/calendar" component={Calendar} />
            </Navigate>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
