import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress, Snackbar, SnackbarContent } from '@mui/material';
import { Delete, Edit, Close as CloseIcon } from '@mui/icons-material';
import { getProjets, deleteProjet } from '../service/api';
import { useNavigate } from 'react-router-dom';

const ResearchProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getProjets().then((response) => {
      setProjects(response.data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/projets/${id}/modifier`);
  };

  const handleDelete = (id) => {
    deleteProjet(id).then(() => {
      setProjects(projects.filter((project) => project.id !== id));
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        handleSnackbarError('Unauthorized to perform this action.');
      } else {
        handleSnackbarError('Failed to delete project.');
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
      {projects.map((project) => (
        <ListItem key={project.id}>
          <ListItemText primary={project.title} secondary={project.description} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(project.id)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(project.id)}>
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

export default ResearchProjectList;
