import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Snackbar, SnackbarContent } from '@mui/material';
import { Delete, Edit, Close as CloseIcon } from '@mui/icons-material';
import { getChercheurs, deleteChercheur } from '../service/api';
import { useNavigate } from 'react-router-dom';

const ResearcherList = () => {
  const [researchers, setResearchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getChercheurs().then((response) => {
      setResearchers(response.data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/chercheurs/${id}/modifier`);
  };

  const handleDelete = (id) => {
    deleteChercheur(id).then(() => {
      setResearchers(researchers.filter((researcher) => researcher.id !== id));
    }).catch((error) => {
      if (error.response && error.response.status === 401) {
        handleSnackbarError('Unauthorized to perform this action.');
      } else {
        handleSnackbarError('Failed to delete researcher.');
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
      {researchers.map((researcher) => (
        <ListItem key={researcher.id}>
          <ListItemText primary={researcher.name} secondary={researcher.specialty} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(researcher.id)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(researcher.id)}>
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

export default ResearcherList;
