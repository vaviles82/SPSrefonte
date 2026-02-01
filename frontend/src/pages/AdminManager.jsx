import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, UserPlus, Trash2, Edit, Save, X, Shield } from 'lucide-react';

const AdminManager = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CREATOR'
  });

  // Fetch admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users/admins', { withCredentials: true });
      console.log(response);
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
      showNotification('Failed to load admin users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/create', formData, { withCredentials: true });
      showNotification(`User ${formData.name} added successfully`, 'success');
      setAddUserOpen(false);
      resetForm();
      fetchAdmins();
    } catch (error) {
      console.error('Error adding user:', error);
      showNotification(error.response?.data?.message || 'Failed to add user', 'error');
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role
      };
      
      // Only include password if it was changed
      if (formData.password) {
        userData.password = formData.password;
      }
      
      await axios.put(`http://localhost:5000/api/users/${userId}`, userData, { withCredentials: true });
      showNotification('User updated successfully', 'success');
      setEditUserId(null);
      resetForm();
      fetchAdmins();
    } catch (error) {
      console.error('Error updating user:', error);
      showNotification(error.response?.data?.message || 'Failed to update user', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, { withCredentials: true });
      showNotification('User deleted successfully', 'success');
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification(error.response?.data?.message || 'Failed to delete user', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'CREATOR'
    });
  };

  const startEdit = (admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      password: '', // Leave password empty for edit
      role: admin.role
    });
    setEditUserId(admin.id);
  };

  const cancelEdit = () => {
    setEditUserId(null);
    resetForm();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Manager</h1>
        <div className="flex gap-2">
          <button 
            className="px-4 py-2 flex items-center gap-2 border rounded-md hover:bg-gray-100"
            onClick={fetchAdmins}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button 
            className="px-4 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setAddUserOpen(true)}
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Users with Access</h2>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admins && admins.length > 0 ? (
                  admins.map((admin) => (
                    <tr key={admin.id}>
                      {editUserId === admin.id ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              name="name"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="email"
                              name="email"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              name="role"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={formData.role}
                              onChange={handleInputChange}
                            >
                              <option value="ADMIN">Admin</option>
                              <option value="CREATOR">Creator</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button
                                className="p-1 text-green-600 hover:text-green-900"
                                onClick={() => handleUpdateUser(admin.id)}
                              >
                                <Save className="w-5 h-5" />
                              </button>
                              <button
                                className="p-1 text-gray-600 hover:text-gray-900"
                                onClick={cancelEdit}
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">{admin.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              admin.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              <Shield className="w-3 h-3 mr-1" />
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                className="p-1 text-blue-600 hover:text-blue-900"
                                onClick={() => startEdit(admin)}
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                className="p-1 text-red-600 hover:text-red-900"
                                onClick={() => handleDeleteUser(admin.id)}
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                      No admin users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {addUserOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New User</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setAddUserOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="ADMIN">Admin</option>
                  <option value="CREATOR">Creator</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-2">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setAddUserOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddUser}
              >
                Add User
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

export default AdminManager;
