import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    societe: '',
    sujet: '',
    newsletter: false,
    confirmation: false,
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'info', message: 'Envoi en cours...' });

    // Formatage des données pour l'API backend
    const payload = {
      name: `${formData.prenom} ${formData.nom}`,
      email: formData.email,
      message: `Sujet: ${formData.sujet} | Tel: ${formData.telephone} | Société: ${formData.societe || 'N/A'}`
    };

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message envoyé avec succès dans la base de données !' });
        // Réinitialisation du formulaire
        setFormData({
          nom: '', prenom: '', email: '', telephone: '',
          societe: '', sujet: '', newsletter: false, confirmation: false,
        });
      } else {
        throw new Error('Erreur serveur');
      }
    } catch (error) {
      console.error("Erreur API:", error);
      setStatus({ type: 'error', message: "Impossible de contacter l'API. Vérifiez que le conteneur sps_api est allumé." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6 my-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contactez-nous</h2>

      {status.message && (
        <div className={`p-4 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="societe" className="block text-sm font-medium text-gray-700">Société (optionnel)</label>
          <input
            type="text"
            id="societe"
            name="societe"
            value={formData.societe}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
          />
        </div>

        <div>
          <label htmlFor="sujet" className="block text-sm font-medium text-gray-700">Sujet</label>
          <input
            type="text"
            id="sujet"
            name="sujet"
            value={formData.sujet}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
          Adhésion à la Newsletter
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="confirmation"
          name="confirmation"
          checked={formData.confirmation}
          onChange={handleChange}
          required
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="confirmation" className="ml-2 block text-sm text-gray-700">
          Confirmation de la récolte des données
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300"
      >
        Envoyer
      </button>
    </form>
  );
};

export default ContactForm;