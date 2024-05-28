// src/App.jsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ArenaProfile from './pages/ArenaProfile';
import OwnerDashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/arena/:id" element={<ArenaProfile />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
