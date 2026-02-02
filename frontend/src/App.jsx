import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // On utilise le cerveau
import Layout from './components/MainLayout'; 
import ContactForm from './components/ContactForm';
import Home from './pages/Home';
import ArticlesPage from './pages/ArticlesPage';
import Login from './pages/Login';
import About from './pages/About';
import CGU from './pages/CGU';
import NewsLetterClient from './pages/NewsLetterClient'; 
import NewsLetter from './pages/NewsLetter'; 
import AdminsDashboard from './pages/AdminsDashboard';
import BackOffice from './pages/BackOffice';
import RequestDetails from './pages/RequestDetails';
import AdminManager from './pages/AdminManager';
import EmailTemplateForm from './pages/EmailTemplateForm';
import AdminLayout from './components/AdminLayout';

function App() {
  const { user, loading } = useAuth(); // On récupère l'état global

  // Empêche le rendu tant que l'auth n'est pas vérifiée (évite les redirections flash)
  if (loading) return <div className="flex h-screen items-center justify-center">Chargement...</div>;

  const isAdmin = (user && user.role === 'ADMIN') || localStorage.getItem('isAdmin') === 'true';

  return (
    <Router>
      <Routes>
        {/* --- ROUTES PUBLIQUES --- */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/contact" element={<Layout><ContactForm /></Layout>} />
        <Route path="/newsletter" element={<Layout><NewsLetterClient /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/cgu" element={<Layout><CGU /></Layout>} />
        <Route path="/news" element={<Layout><ArticlesPage categoryName="News" title="Actualités Padel" /></Layout>} />
        <Route path="/blog" element={<Layout><ArticlesPage categoryName="Blog" title="Le Blog SPS" /></Layout>} />
        <Route path="/events" element={<Layout><ArticlesPage categoryName="Events" title="Événements & Tournois" /></Layout>} />
        
        {/* Redirige vers /admin si déjà connecté */}
        <Route path="/login" element={<Layout><Login /></Layout>} />

        {/* --- ROUTES ADMIN --- */}
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<AdminsDashboard />} />
          <Route path="dashboard" element={<AdminsDashboard />} />
          <Route path="requests" element={<BackOffice />} />
          <Route path="requests/:id" element={<RequestDetails />} />
          <Route path="newsletter" element={<NewsLetter />} />
          <Route path="templates" element={<EmailTemplateForm />} />
          <Route path="users" element={<AdminManager />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;