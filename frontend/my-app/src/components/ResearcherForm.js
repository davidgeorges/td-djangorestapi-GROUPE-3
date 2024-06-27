import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getChercheur, updateChercheur, createChercheur } from '../service/api';

const ResearcherForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    specialty: ''
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (id) {
      getChercheur(id)
        .then((response) => setFormData(response.data))
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to fetch researcher.');
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
      updateChercheur(id, formData)
        .then(() => {
          navigate('/chercheurs');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to update researcher.');
          }
        });
    } else {
      createChercheur(formData)
        .then(() => {
          navigate('/chercheurs');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to create researcher.');
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
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="specialty"
        label="Specialty"
        value={formData.specialty}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update Researcher' : 'Create Researcher'}
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

export default ResearcherForm;
