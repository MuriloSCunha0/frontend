import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in', error);
      alert('Error logging in');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
    </Container>
  );
};

export default Login;
