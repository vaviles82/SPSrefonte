import { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    company: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    newsletter: false,
    content: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');
    
    try {
      // 1. On vérifie l'URL : Ton backend attend "requests", pas "contact"
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/requests`, formData);
      
      setSubmitMessage('Votre demande a été soumise avec succès !');
      setFormData({
        company: '', first_name: '', last_name: '',
        email: '', phone_number: '', newsletter: false, content: ''
      });
    } catch (error) {
      // 2. Gestion d'erreur plus précise pour le debug
      setSubmitError('Le serveur ne répond pas. Vérifiez que votre API est lancée sur le port 5000.');
      console.error('Détails erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-[#010360] uppercase tracking-wider">Contactez SPS</h2>
        <div className="w-20 h-1.5 bg-[#FCDA35] mx-auto mt-3 rounded-full"></div>
      </div>

      {submitMessage && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center font-bold">✅ {submitMessage}</div>}
      {submitError && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-center font-bold">❌ {submitError}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-bold text-[#010360] uppercase">Entreprise</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCDA35] outline-none" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-bold text-[#010360] uppercase">Prénom</label>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCDA35] outline-none" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-bold text-[#010360] uppercase">Nom</label>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCDA35] outline-none" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-bold text-[#010360] uppercase">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCDA35] outline-none" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-bold text-[#010360] uppercase">Téléphone</label>
            <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCDA35] outline-none" />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-bold text-[#010360] uppercase">Votre message</label>
          <textarea name="content" value={formData.content} onChange={handleChange} rows="5" required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FCDA35] outline-none"></textarea>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg border">
          <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="w-5 h-5 text-[#010360]" />
          <label className="ml-3 text-sm text-gray-700">S'abonner à la newsletter</label>
        </div>
        <button type="submit" disabled={isSubmitting}
          className="w-full py-4 bg-[#010360] text-white font-black rounded-xl uppercase tracking-widest hover:bg-blue-800 disabled:bg-gray-400 transition-all">
          {isSubmitting ? 'Envoi...' : 'Envoyer ma demande'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;