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
  
  // Pagination and search states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);

  // Fetch subscribers and templates on component mount
  useEffect(() => {
    fetchSubscribers();
    fetchTemplates();
  }, []);

  // Filter subscribers based on search term
  useEffect(() => {
    if (subscribers.length > 0) {
      const results = subscribers.filter(subscriber => 
        subscriber.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubscribers(results);
      setCurrentPage(1); // Reset to first page on new search
    }
  }, [searchTerm, subscribers]);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/email/suscribers', { withCredentials: true });
      console.log(response.data);
      setSubscribers(response.data);
      setFilteredSubscribers(response.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      showNotification('Failed to load subscribers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/email/templates', { withCredentials: true });
      setTemplates(response.data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      showNotification('Failed to load email templates', 'error');
    }
  };

  const handleSelectSubscriber = (subscriberId) => {
    setSelectedSubscribers(prev => {
      if (prev.includes(subscriberId)) {
        return prev.filter(id => id !== subscriberId);
      } else {
        return [...prev, subscriberId];
      }
    });
  };

  const handleSelectAllVisibleSubscribers = () => {
    const visibleSubscriberIds = paginatedSubscribers.map(sub => sub.id);
    
    // Check if all visible subscribers are already selected
    const allVisibleSelected = visibleSubscriberIds.every(id => 
      selectedSubscribers.includes(id)
    );
    
    if (allVisibleSelected) {
      // Deselect only the visible subscribers
      setSelectedSubscribers(prev => 
        prev.filter(id => !visibleSubscriberIds.includes(id))
      );
    } else {
      // Add all visible subscribers that aren't already selected
      setSelectedSubscribers(prev => {
        const newSelection = [...prev];
        visibleSubscriberIds.forEach(id => {
          if (!newSelection.includes(id)) {
            newSelection.push(id);
          }
        });
        return newSelection;
      });
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 5000);
  };

  const handleSendEmail = async () => {
    if (!selectedTemplate || selectedSubscribers.length === 0 || !emailSubject) {
      showNotification('Please select a template, subject, and at least one subscriber', 'warning');
      return;
    }

    setEmailSending(true);
    try {
      // Get all selected subscribers
      const selectedSubscriberData = selectedSubscribers.map(id => {
        const subscriber = subscribers.find(s => s.id === id);
        return {
          email: subscriber.email,
          first_name: subscriber.first_name,
          last_name: subscriber.last_name,
          company: subscriber.company,
          main_content: emailContent
        };
      });
      
      // Send batch email
      await axios.post('http://localhost:5000/api/email/send-batch', {
        templateId: selectedTemplate,
        subject: emailSubject,
        recipients: selectedSubscriberData
      }, { withCredentials: true });
      
      showNotification(`Email sent to ${selectedSubscribers.length} subscribers`, 'success');
      
      // Reset selection and close dialog
      setSelectedSubscribers([]);
      setEmailContent('');
      setOpenDialog(false);
      
    } catch (error) {
      console.error('Error sending emails:', error);
      showNotification('Failed to send emails', 'error');
    } finally {
      setEmailSending(false);
    }
  };

  const handleOpenSendDialog = () => {
    if (selectedSubscribers.length === 0) {
      showNotification('Please select at least one subscriber', 'warning');
      return;
    }
    setOpenDialog(true);
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Newsletter Management</h1>
        <button 
          className="px-4 py-2 flex items-center gap-2 border rounded-md hover:bg-gray-100"
          onClick={() => {
            fetchSubscribers();
            fetchTemplates();
          }}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Subscribers ({filteredSubscribers.length})</h2>
          <button 
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${selectedSubscribers.length === 0 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={handleOpenSendDialog}
            disabled={selectedSubscribers.length === 0}
          >
            <Send className="w-4 h-4" />
            <span>Send Email ({selectedSubscribers.length})</span>
          </button>
        </div>
        
        {/* Search Box */}
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name, email or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 border-gray-300 rounded"
                      checked={paginatedSubscribers.length > 0 && paginatedSubscribers.every(sub => selectedSubscribers.includes(sub.id))}
                      onChange={handleSelectAllVisibleSubscribers}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Subscribed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedSubscribers.length > 0 ? (
                  paginatedSubscribers.map((subscriber) => (
                    <tr 
                      key={subscriber.id}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedSubscribers.includes(subscriber.id) ? 'bg-blue-50' : ''}`}
                      onClick={() => handleSelectSubscriber(subscriber.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 border-gray-300 rounded"
                          checked={selectedSubscribers.includes(subscriber.id)}
                          onChange={() => {}}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{`${subscriber.first_name} ${subscriber.last_name}`}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{subscriber.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{subscriber.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(subscriber.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          subscriber.status === 'new' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscriber.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      {searchTerm ? 'No matching subscribers found' : 'No subscribers found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination Controls */}
        {!loading && filteredSubscribers.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex items-center">
              <select
                className="mr-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page when items per page changes
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-500">per page</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-3">
                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredSubscribers.length)}</span> of <span className="font-medium">{filteredSubscribers.length}</span> results
              </span>
              <div className="flex items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border-t border-b border-gray-300 bg-white text-sm">
                  {currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Send Email Dialog */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Send Newsletter</h2>
            
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  required
                >
                  <option value="">Select a template</option>
                  {templates.length > 0 ? (
                    templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No templates available</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dynamic Content for Template
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  placeholder="Enter content to be inserted into the template..."
                  rows={6}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This content will be included in the dynamic template. The template will automatically include each recipient's name and company.
                </p>
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">
                  Sending to {selectedSubscribers.length} subscribers
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </button>
              <button 
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  emailSending || !selectedTemplate || !emailSubject
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                onClick={handleSendEmail}
                disabled={emailSending || !selectedTemplate || !emailSubject}
              >
                {emailSending ? (
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
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-lg ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-yellow-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default NewsLetter;
