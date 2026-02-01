import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import EmailResponseForm from "../components/EmailResponseForm";

function RequestDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/requests/getById/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/email/templates', { withCredentials: true });
      setTemplates(response.data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleReplyClick = () => {
    fetchTemplates();
    setShowEmailForm(true);
  };

  if (!request) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-full min-w-full sm:text-sm">
      <div className="bg-green-600 text-white text-xl font-semibold p-3 flex justify-between items-center">
        <span>{request.company}</span>
        <button 
          onClick={handleReplyClick} 
          className="bg-white text-green-600 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-gray-100"
        >
          <Send className="w-4 h-4" />
          Répondre
        </button>
      </div>
      {/* Desktop View */}
      <div className="hidden md:flex md:flex-col md:space-y-4">
        <div className="flex bg-green-700 text-white p-3">
          <div className="w-1/5">Prénom</div>
          <div className="w-1/5">Nom</div>
          <div className="w-1/5">E-mail</div>
          <div className="w-1/5">Téléphone</div>
          <div className="w-1/5">Date du message</div>
        </div>

        <div className="flex border-b p-3">
          <div className="w-1/5">{request.first_name}</div>
          <div className="w-1/5">{request.last_name}</div>
          <div className="w-1/5">{request.email}</div>
          <div className="w-1/5">{request.phone_number}</div>
          <div className="w-1/5">
            {new Date(request.createdAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
        <div className="flex bg-gray-100 border-b p-3">
          <div className="w-1/2 font-semibold text-gray-600">Newsletter</div>
          <div
            className={`w-1/2 font-semibold ${
              request.newsletter === true ? "text-green-600" : "text-red-600"
            }`}
          >
            {request.newsletter === true ? "Subscribed" : "Unsubscribed"}
          </div>
        </div>
      </div>

      {/* Mobile View  */}
      <div className="md:hidden">
        <div className="p-4 border-b border-gray-200">
          <p className="font-semibold">Prénom:</p>
          <p>{request.first_name}</p>
        </div>
        <div className="p-4 border-b border-gray-200">
          <p className="font-semibold">Nom:</p>
          <p>{request.last_name}</p>
        </div>
        <div className="p-4 border-b border-gray-200">
          <p className="font-semibold">E-mail:</p>
          <p>{request.email}</p>
        </div>
        <div className="p-4 border-b border-gray-200">
          <p className="font-semibold">Téléphone:</p>
          <p>{request.phone_number}</p>
        </div>
        <div className="p-4 border-b border-gray-200">
          <p className="font-semibold">Date du message:</p>
          <p>
            {new Date(request.createdAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="p-4 border-b border-gray-200">
          <p className="font-semibold">Newsletter:</p>
          <p
            className={`font-semibold ${
              request.newsletter === 1 ? "text-green-600" : "text-red-600"
            }`}
          >
            {request.newsletter === 1 ? "Subscribed" : "Unsubscribed"}
          </p>
        </div>
      </div>

      <div className="text-gray-800 text-sm px-1">
        <p className="font-medium">Message:</p>
        <p className="mt-2 italic bg-gray-50 p-3 rounded-md border border-gray-200 text-wrap">
          {request.content}
        </p>
      </div>

      {/* Email Response Form */}
      {showEmailForm && (
        <EmailResponseForm 
          request={request} 
          templates={templates} 
          onClose={() => setShowEmailForm(false)} 
        />
      )}
    </div>
  );
}

export default RequestDetails;
