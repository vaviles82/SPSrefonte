import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, Send, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const NewsLetter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (subscribers.length > 0) {
      const results = subscribers.filter(subscriber => 
        (subscriber.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (subscriber.last_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (subscriber.company || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubscribers(results);
      setCurrentPage(1);
    }
  }, [searchTerm, subscribers]);

  const fetchSubscribers = async () => {
  setLoading(true);
  try {
    // On essaie quand même l'appel
    const response = await axios.get('http://localhost:5000/api/email/suscribers', { withCredentials: true });
    setSubscribers(response.data);
    setFilteredSubscribers(response.data);
  } catch (error) {
    console.warn("API non jointe, chargement des données de test pour démo.");
    
    // DONNÉES FICTIVES POUR TES CAPTURES D'ÉCRAN
    const mockData = [
      { id: 1, first_name: "Jean", last_name: "Dupont", email: "j.dupont@entreprise.fr", company: "Padel Corp", active: true, createdAt: new Date() },
      { id: 2, first_name: "Marie", last_name: "Padel", email: "marie@club.ch", company: "Swiss Club", active: true, createdAt: new Date() },
      { id: 3, first_name: "Admin", last_name: "SPS", email: "admin@swisspadelstars.ch", company: "SPS", active: true, createdAt: new Date() }
    ];
    
    setSubscribers(mockData);
    setFilteredSubscribers(mockData);
  } finally {
    setLoading(false);
  }
};

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/email/templates', { withCredentials: true });
      // On s'adapte au format de réponse (tableau direct ou objet contenant templates)
      setTemplates(Array.isArray(response.data) ? response.data : response.data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleSelectSubscriber = (subscriberId) => {
    setSelectedSubscribers(prev => 
      prev.includes(subscriberId) ? prev.filter(id => id !== subscriberId) : [...prev, subscriberId]
    );
  };

  const handleSelectAllVisibleSubscribers = () => {
    const visibleIds = paginatedSubscribers.map(sub => sub.id);
    const allVisibleSelected = visibleIds.every(id => selectedSubscribers.includes(id));
    
    if (allVisibleSelected) {
      setSelectedSubscribers(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
      setSelectedSubscribers(prev => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
  };

  const handleSendEmail = async () => {
    if (!selectedTemplate || selectedSubscribers.length === 0 || !emailSubject) {
      showNotification('Veuillez remplir tous les champs', 'warning');
      return;
    }

    setEmailSending(true);
    try {
      const selectedData = selectedSubscribers.map(id => {
        const sub = subscribers.find(s => s.id === id);
        return {
          email: sub.email,
          first_name: sub.first_name,
          last_name: sub.last_name,
          company: sub.company
        };
      });
      
      await axios.post('http://localhost:5000/api/email/send-batch', {
        templateId: selectedTemplate,
        subject: emailSubject,
        recipients: selectedData,
        main_content: emailContent // On passe le contenu dynamique ici
      }, { withCredentials: true });
      
      showNotification(`Email envoyé à ${selectedSubscribers.length} abonnés`, 'success');
      setSelectedSubscribers([]);
      setOpenDialog(false);
    } catch (error) {
      showNotification('Erreur lors de l\'envoi', 'error');
    } finally {
      setEmailSending(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion de la Newsletter</h1>
        <button onClick={fetchSubscribers} className="p-2 border rounded hover:bg-gray-50 flex gap-2 items-center">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Actualiser
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un abonné..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            disabled={selectedSubscribers.length === 0}
            onClick={() => setOpenDialog(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              selectedSubscribers.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-4 h-4" /> Envoyer ({selectedSubscribers.length})
          </button>
        </div>

        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-4">
                <input type="checkbox" onChange={handleSelectAllVisibleSubscribers} 
                  checked={paginatedSubscribers.length > 0 && paginatedSubscribers.every(s => selectedSubscribers.includes(s.id))} />
              </th>
              <th className="p-4">Nom</th>
              <th className="p-4">Email</th>
              <th className="p-4">Entreprise</th>
              <th className="p-4">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedSubscribers.map(sub => (
              <tr key={sub.id} className={`hover:bg-blue-50 ${selectedSubscribers.includes(sub.id) ? 'bg-blue-50' : ''}`}>
                <td className="p-4">
                  <input type="checkbox" checked={selectedSubscribers.includes(sub.id)} onChange={() => handleSelectSubscriber(sub.id)} />
                </td>
                <td className="p-4 font-medium">{sub.first_name} {sub.last_name}</td>
                <td className="p-4">{sub.email}</td>
                <td className="p-4 text-gray-500">{sub.company || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${sub.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {sub.active ? 'Actif' : 'Inactif'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-4 flex justify-between items-center border-t">
          <span className="text-gray-500">Page {currentPage} sur {totalPages || 1}</span>
          <div className="flex gap-2">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(v => v - 1)} className="p-2 border rounded disabled:opacity-50"><ChevronLeft/></button>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(v => v + 1)} className="p-2 border rounded disabled:opacity-50"><ChevronRight/></button>
          </div>
        </div>
      </div>

      {/* Modal d'envoi */}
      {openDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Préparer l'envoi</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Objet de l'email" className="w-full p-2 border rounded" 
                value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
              
              <select className="w-full p-2 border rounded" value={selectedTemplate} onChange={e => setSelectedTemplate(e.target.value)}>
                <option value="">Choisir un Template</option>
                {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>

              <textarea placeholder="Contenu de votre message..." rows="6" className="w-full p-2 border rounded"
                value={emailContent} onChange={e => setEmailContent(e.target.value)}></textarea>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setOpenDialog(false)} className="px-4 py-2 text-gray-600">Annuler</button>
              <button onClick={handleSendEmail} disabled={emailSending} className="bg-blue-600 text-white px-6 py-2 rounded-lg flex gap-2 items-center">
                {emailSending ? 'Envoi...' : <><Send className="w-4 h-4"/> Envoyer</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white ${notification.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default NewsLetter;