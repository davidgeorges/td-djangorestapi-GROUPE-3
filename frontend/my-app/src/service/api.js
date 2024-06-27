import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  withCredentials: true
});

// Chercheurs
export const getChercheurs = () => api.get('chercheurs/');
export const getChercheur = (id) => api.get(`chercheurs/${id}/`);
export const createChercheur = (data) => api.post('chercheurs/', data);
export const updateChercheur = (id, data) => api.put(`chercheurs/${id}/`, data);
export const deleteChercheur = (id) => api.delete(`chercheurs/${id}/`);

// Projets
export const getProjets = (filters = {}) => api.get('projets/', { params: filters });
export const getProjet = (id) => api.get(`projets/${id}/`);
export const createProjet = (data) => api.post('projets/', data);
export const updateProjet = (id, data) => api.put(`projets/${id}/`, data);
export const deleteProjet = (id) => api.delete(`projets/${id}/`);

// Publications
export const getPublications = (filters = {}) => api.get('publications/', { params: filters });
export const getPublication = (id) => api.get(`publications/${id}/`);
export const createPublication = (data) => api.post('publications/', data);
export const updatePublication = (id, data) => api.put(`publications/${id}/`, data);
export const deletePublication = (id) => api.delete(`publications/${id}/`);


export const getToken = async () => {
  try {
    const response = await api.get('/getToken/');
    console.log('Token response:', response.data);
    return response.data.access;
  } catch (error) {
    console.error('Failed to fetch token:', error);
    throw error;
  }
};
