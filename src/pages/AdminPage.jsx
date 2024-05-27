import React from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminPage = () => {
  // Dummy data for users
  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
    // Add more users here
  ];

  return (
    <Container maxWidth="lg">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Administração da Plataforma</Typography>
        <Button variant="contained" color="primary" onClick={() => { /* Add user logic here */ }}>
          Adicionar Usuário
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminPage;