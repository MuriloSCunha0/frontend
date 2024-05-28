import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        phone,
        role: 'player'
      });

      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user', error);
      alert('Error registering user');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
      <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
    </Container>
  );
};

export default Register;
