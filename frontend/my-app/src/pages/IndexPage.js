import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const IndexPage = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                By David GEORGES - Bienvenue sur l'application !
            </Typography>
            <Typography variant="body1" paragraph>
                Voici les principales fonctionnalités disponibles :
            </Typography>
            <List>
                <ListItem component={Link} to="/chercheurs" >
                    <ListItemText primary="Liste des chercheurs" />
                </ListItem>
                <ListItem component={Link} to="/projets" button>
                    <ListItemText primary="Liste des projets de recherche" />
                </ListItem>
                <ListItem component={Link} to="/publications" button>
                    <ListItemText primary="Liste des publications" />
                </ListItem>
            </List>
        </Container>
    );
};

export default IndexPage;
