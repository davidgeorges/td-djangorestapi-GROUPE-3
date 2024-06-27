import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import { getProjets, getPublications } from '../service/api';

const AdvancedSearch = () => {
  const [filters, setFilters] = useState({
    title: '',
    start_date: '',
    end_date: '',
    researcher: ''
  });
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('projects');

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    const searchFunction = searchType === 'projects' ? getProjets : getPublications;
    searchFunction(filters).then((response) => {
      setResults(response.data);
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            label="Search Type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            fullWidth
          >
            <MenuItem value="projects">Projects</MenuItem>
            <MenuItem value="publications">Publications</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="title"
            label="Title"
            value={filters.title}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="start_date"
            label="Start Date"
            type="date"
            value={filters.start_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            name="end_date"
            label="End Date"
            type="date"
            value={filters.end_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="researcher"
            label="Researcher"
            value={filters.researcher}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
      <div>
        <h2>Results</h2>
        {results.map((result) => (
          <div key={result.id}>
            <h3>{result.title}</h3>
            <p>{result.description || result.abstract}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedSearch;
