import React from 'react';
import { AppBar, Container } from '@mui/material';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
      <NavBar/>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
