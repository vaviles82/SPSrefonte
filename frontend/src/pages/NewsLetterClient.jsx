import React, { useState } from 'react';

const NewsletterClient = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: 'info', message: 'Inscription en cours...' });

    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Merci ! Vous êtes inscrit.' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.message || 'Une erreur est survenue.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: "Impossible de joindre le serveur." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-blue-600 py-12 px-4 rounded-xl shadow-lg my-10 max-w-4xl mx-auto text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Restez informé !</h2>
        <p className="text-blue-100 mb-8">Inscrivez-vous pour recevoir les actualités du SPS.</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="votre@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            disabled={loading}
          />
          <button
            type="submit" disabled={loading}
            className={`px-6 py-3 rounded-md font-bold transition ${
              loading ? 'bg-gray-400' : 'bg-yellow-400 hover:bg-yellow-500 text-blue-900'
            }`}
          >
            {loading ? 'Envoi...' : "S'inscrire"}
          </button>
        </form>

        {status.message && (
          <div className={`mt-4 p-3 rounded-md text-sm ${status.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            {status.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsletterClient;