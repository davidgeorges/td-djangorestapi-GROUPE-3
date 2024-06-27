import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Snackbar, SnackbarContent } from '@mui/material';
import { Delete, Edit,Close as CloseIcon } from '@mui/icons-material';
import { getPublications, deletePublication } from '../service/api';
import { useNavigate } from 'react-router-dom';

const PublicationList = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getPublications().then((response) => {
      setPublications(response.data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/publications/${id}/modifier`);
  };

  const handleDelete = (id) => {
    deletePublication(id).then(() => {
      setPublications(publications.filter((publication) => publication.id !== id));
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        handleSnackbarError('Unauthorized to perform this action.');
      } else {
        handleSnackbarError('Failed to delete publication.');
      }
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  const handleSnackbarError = (errorMessage) => {
    setError(errorMessage);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <List>
      {publications.map((publication) => (
        <ListItem key={publication.id}>
          <ListItemText primary={publication.title} secondary={publication.abstract} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(publication.id)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(publication.id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
       <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContent
          style={{ backgroundColor: '#d32f2f' }}
          message={`Error: ${error}`}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </List>
  );
};

export default PublicationList;
