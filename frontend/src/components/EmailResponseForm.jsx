import { useState } from "react";
import axios from "axios";
import { Send, X } from "lucide-react";

function EmailResponseForm({ request, templates, onClose }) {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailSubject, setEmailSubject] = useState(`RE: Demande de ${request.company}`);
  const [emailContent, setEmailContent] = useState('');
  const [sending, setSending] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 5000);
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
    // Here you could potentially load template content or preview
  };

  const handleSendEmail = async () => {
    if (!emailSubject) {
      showNotification('Please enter an email subject', 'error');
      return;
    }

    setSending(true);
    try {
      await axios.post('http://localhost:5000/api/email/send', {
        templateId: selectedTemplate || null,
        to: request.email,
        subject: emailSubject,
        dynamicData: {
          first_name: request.first_name,
          last_name: request.last_name,
          company: request.company,
          main_content: emailContent
        }
      }, { withCredentials: true });
      
      showNotification('Email sent successfully', 'success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error sending email:', error);
      showNotification('Failed to send email', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-8 border-t-2 border-green-200 pt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-green-700">Répondre à cette demande</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Template (Optional)</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedTemplate}
            onChange={handleTemplateChange}
          >
            <option value="">No template (custom email)</option>
            {templates.length > 0 ? (
              templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))
            ) : (
              <option disabled>Loading templates...</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {selectedTemplate ? 'Dynamic Content for Template' : 'Email Content'}
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-h-32"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder={selectedTemplate 
              ? "Enter content to be inserted into the template..." 
              : "Enter your full message here..."}
            rows={6}
          />
          {selectedTemplate && (
            <p className="text-xs text-gray-500 mt-1">
              This content will be included in the dynamic template. The template will also include the contact's name and company automatically.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              sending ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            onClick={handleSendEmail}
            disabled={sending}
          >
            {sending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`mt-4 px-4 py-3 rounded-md ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
          'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default EmailResponseForm; 