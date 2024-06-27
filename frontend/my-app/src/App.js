import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ResearchProjectList from './components/ResearchProjectList';
import ResearchProjectForm from './components/ResearchProjectForm';
import PublicationList from './components/PublicationList';
import PublicationForm from './components/PublicationForm';
import ResearcherList from './components/ResearcherList';
import ResearcherForm from './components/ResearcherForm';
import AdvancedSearch from './components/AdvancedSearch';
import './App.css';
import IndexPage from './pages/IndexPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<IndexPage/>} />
          <Route path="/projets" element={<ResearchProjectList />} />
          <Route path="/projets/ajouter" element={<ResearchProjectForm />} />
          <Route path="/projets/:id/modifier" element={<ResearchProjectForm />} />
          <Route path="/publications" element={<PublicationList />} />
          <Route path="/publications/ajouter" element={<PublicationForm />} />
          <Route path="/publications/:id/modifier" element={<PublicationForm />} />
          <Route path="/chercheurs" element={<ResearcherList />} />
          <Route path="/chercheurs/ajouter" element={<ResearcherForm />} />
          <Route path="/chercheurs/:id/modifier" element={<ResearcherForm />} />
          <Route path="/recherche-avancee" element={<AdvancedSearch />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
