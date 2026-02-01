import { useEffect, useState } from 'react';
import { Mail, User, Calendar, MessageSquare, RefreshCcw } from 'lucide-react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/contact')
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur fetching messages:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-[#000260]">Panel Administration</h2>
            <p className="text-gray-500">Gestion des prises de contact SwissPadelStars</p>
          </div>
          <button 
            onClick={fetchMessages}
            className="flex items-center bg-[#000260] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition shadow-md"
          >
            <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Actualiser
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-yellow-400 text-[#000260] uppercase text-sm font-bold">
                <th className="px-6 py-4">Utilisateur</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Message / Détails</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-blue-50 transition duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-[#000260] mr-3">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-800">{msg.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm">
                      <span className="flex items-center text-gray-600">
                        <Mail className="w-3 h-3 mr-2" /> {msg.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start max-w-md">
                      <MessageSquare className="w-4 h-4 mr-2 mt-1 text-yellow-500 shrink-0" />
                      <p className="text-sm text-gray-700 italic leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="w-3 h-3 mr-2" />
                      {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {messages.length === 0 && !loading && (
            <div className="py-20 text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aucun message reçu pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;