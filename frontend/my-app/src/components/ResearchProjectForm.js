import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, SnackbarContent, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getProjet, updateProjet, createProjet } from '../service/api';

const ResearchProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    expected_end_date: '',
    project_leader: '',
    researchers: []
  });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (id) {
      getProjet(id)
        .then((response) => setFormData(response.data))
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to fetch project.');
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
      updateProjet(id, formData)
        .then(() => {
          navigate('/projets');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to update project.');
          }
        });
    } else {
      createProjet(formData)
        .then(() => {
          navigate('/projets');
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            handleSnackbarError('Unauthorized to perform this action.');
          } else {
            handleSnackbarError('Failed to create project.');
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
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="start_date"
        label="Start Date"
        type="date"
        value={formData.start_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="expected_end_date"
        label="Expected End Date"
        type="date"
        value={formData.expected_end_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        name="project_leader"
        label="Project Leader"
        value={formData.project_leader}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="researchers"
        label="Researchers"
        value={formData.researchers}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {id ? 'Update Project' : 'Create Project'}
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

export default ResearchProjectForm;
