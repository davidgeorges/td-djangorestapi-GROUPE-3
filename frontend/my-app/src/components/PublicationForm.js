import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getPublication, updatePublication, createPublication } from '../service/api';

const PublicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    publication_date: '',
    associated_project: ''
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (id) {
      getPublication(id)
        .then((response) => setFormData(response.data))
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to fetch publication.');
          }
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updatePublication(id, formData)
        .then(() => {
          navigate('/publications');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to update publication.');
          }
        });
    } else {
      createPublication(formData)
        .then(() => {
          navigate('/publications');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to create publication.');
          }
        });
    }
  };

  const handleSnackbarError = (errorMessage) => {
    setError(errorMessage);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="abstract"
        label="Abstract"
        value={formData.abstract}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="publication_date"
        label="Publication Date"
        type="date"
        value={formData.publication_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="associated_project"
        label="Associated Project"
        value={formData.associated_project}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update Publication' : 'Create Publication'}
      </Button>
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
    </form>
  );
};

export default PublicationForm;
