import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
  const { user } = useAuth();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Beach Tennis Arena
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Registrar</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
