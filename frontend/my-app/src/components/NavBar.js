import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getToken } from '../service/api';

const NavBar = () => {
  const handleGetToken = async () => {
    try {
      const token = await getToken();
    } catch (error) {
      console.error('Erreur lors de la récupération du token :', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Research Project Tracker
          </Button>
        </Typography>
        <Button color="inherit" onClick={handleGetToken}>
          GET TOKEN
        </Button>
        <Button color="inherit" component={Link} to="/projets">
          Projects
        </Button>
        <Button color="inherit" component={Link} to="/projets/ajouter">
          Create Project
        </Button>
        <Button color="inherit" component={Link} to="/chercheurs">
          Researchers
        </Button>
        <Button color="inherit" component={Link} to="/chercheurs/ajouter">
          Create Researcher
        </Button>
        <Button color="inherit" component={Link} to="/publications">
          Publications
        </Button>
        <Button color="inherit" component={Link} to="/publications/ajouter">
          Create Publication
        </Button>
        <Button color="inherit" component={Link} to="/recherche-avancee">
          Advanced Search
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
