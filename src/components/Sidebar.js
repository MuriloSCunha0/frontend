import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Box, Divider } from '@mui/material';
import { Home, Add, AccountCircle, ExitToApp, CalendarToday } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const drawerWidth = 240;

const Sidebar = ({ user, userType, children }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Beach Tennis Arena
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {user && (
            <ListItem button component={Link} to="/calendar">
              <ListItemIcon><CalendarToday /></ListItemIcon>
              <ListItemText primary="Calendário" />
            </ListItem>
          )}
          {user && userType === 'owner' && (
            <ListItem button component={Link} to="/arena/new">
              <ListItemIcon><Add /></ListItemIcon>
              <ListItemText primary="Cadastrar Arena" />
            </ListItem>
          )}
          {user && userType === 'admin' && (
            <ListItem button component={Link} to="/admin">
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          )}
          {user && (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><ExitToApp /></ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
