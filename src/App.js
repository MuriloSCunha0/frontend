import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ArenaForm from './pages/ArenaForm';
import AdminPage from './pages/AdminPage';
import { auth, firestore } from './firebase';
import Sidebar from './components/Sidebar';
import theme from './theme';


const App = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        setUserType(userDoc.data().userType);
      } else {
        setUser(null);
        setUserType('');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Sidebar user={user} userType={userType}>
          <Routes>
            <Route exact path="/">
              <Home user={user} userType={userType} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/arena/new">
              {user && userType === 'owner' ? <ArenaForm /> : <Navigate to="/login" />}
            </Route>
            <Route path="/admin">
              {user && userType === 'admin' ? <AdminPage /> : <Navigate to="/login" />}
            </Route>
          </Routes>
        </Sidebar>
      </Router>
    </ThemeProvider>
  );
};

export default App;
