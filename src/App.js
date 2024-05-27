import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ArenaForm from './pages/ArenaForm';
import AdminPage from './pages/AdminPage';
import Calendar from './pages/Calendar';
import Sidebar from './components/Sidebar';
import './App.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/Login" element={<Login/>} />
              <Route path="/Signup" element={<Signup/>} />
              <Route path="/ArenaForm" element={<ArenaForm/>} />
              <Route path="/AdminPage" element={<AdminPage/>} />
              <Route path="/Calendar" element={<Calendar/>} />
           </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
