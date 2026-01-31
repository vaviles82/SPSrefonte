import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/MainLayout'; 
import ContactForm from './components/ContactForm';
import AdminMessages from './pages/AdminMessages';
import Home from './pages/Home';
import ArticlesPage from './pages/ArticlesPage';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><ContactForm /></Layout>} />
        <Route path="/news" element={<Layout><ArticlesPage categoryName="News" title="Actualités Padel" /></Layout>} />
        <Route path="/blog" element={<Layout><ArticlesPage categoryName="Blog" title="Le Blog SPS" /></Layout>} />
        <Route path="/events" element={<Layout><ArticlesPage categoryName="Events" title="Événements & Tournois" /></Layout>} />
        
        {/* Route Login publique */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        
        {/* Route Admin sécurisée (une seule fois) */}
        <Route path="/admin-sps" element={
          localStorage.getItem('isAdmin') === 'true' ? <AdminMessages /> : <Layout><Login /></Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;