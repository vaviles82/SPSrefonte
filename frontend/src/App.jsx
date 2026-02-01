import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/MainLayout'; 
import ContactForm from './components/ContactForm';
import Home from './pages/Home';
import ArticlesPage from './pages/ArticlesPage';
import Login from './pages/Login';
import About from './pages/About';
import CGU from './pages/CGU';

// Importations uniques et claires
import NewsLetterClient from './pages/NewsLetterClient'; 
import NewsLetter from './pages/NewsLetter'; 

import AdminsDashboard from './pages/AdminsDashboard';
import BackOffice from './pages/BackOffice';
import RequestDetails from './pages/RequestDetails';
import AdminManager from './pages/AdminManager';
import EmailTemplateForm from './pages/EmailTemplateForm';

function App() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <Routes>
        {/* Routes Publiques */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><ContactForm /></Layout>} />
        <Route path="/newsletter" element={<Layout><NewsLetterClient /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/cgu" element={<Layout><CGU /></Layout>} />
        <Route path="/news" element={<Layout><ArticlesPage categoryName="News" title="Actualités Padel" /></Layout>} />
        <Route path="/blog" element={<Layout><ArticlesPage categoryName="Blog" title="Le Blog SPS" /></Layout>} />
        <Route path="/events" element={<Layout><ArticlesPage categoryName="Events" title="Événements & Tournois" /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        
        {/* Routes Admin */}
        <Route path="/admin" element={isAdmin ? <Layout><AdminsDashboard /></Layout> : <Navigate to="/login" />} />
        <Route path="/admin/requests" element={isAdmin ? <Layout><BackOffice /></Layout> : <Navigate to="/login" />} />
        <Route path="/admin/requests/:id" element={isAdmin ? <Layout><RequestDetails /></Layout> : <Navigate to="/login" />} />
        
        {/* Route Admin : Gestion Newsletter */}
        <Route path="/admin/newsletter" element={isAdmin ? <Layout><NewsLetter /></Layout> : <Navigate to="/login" />} />
        
        <Route path="/admin/templates" element={isAdmin ? <Layout><EmailTemplateForm /></Layout> : <Navigate to="/login" />} />
        <Route path="/admin/users" element={isAdmin ? <Layout><AdminManager /></Layout> : <Navigate to="/login" />} />

        <Route path="/admin-sps" element={<Navigate to="/admin" />} />
      </Routes>
    </Router>
  );
}

export default App;