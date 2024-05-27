import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      Navigate('/');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Box mt={2}>
            <Typography variant="body2">
              Não tem uma conta? <Link to="/signup">Cadastre-se</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
