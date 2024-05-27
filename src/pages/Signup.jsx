import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('player'); // Default to player
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Save user type in Firestore
      await firestore.collection('users').doc(user.uid).set({
        email,
        userType,
      });

      Navigate('/');
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <TextField
            label="Tipo de Usuário"
            select
            fullWidth
            margin="normal"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <MenuItem value="player">Jogador</MenuItem>
            <MenuItem value="owner">Proprietário</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
          <Box mt={2}>
            <Typography variant="body2">
              Já tem uma conta? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
