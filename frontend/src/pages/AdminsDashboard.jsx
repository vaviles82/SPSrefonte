import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, BarChart3, PieChart, Users, Mail, AlertTriangle } from 'lucide-react';

const AdminsDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    newRequests: 0,
    responseRate: 0
  });
  const [newRequests, setNewRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    weeklyRequests: Array(7).fill(0),
    requestsByType: { general: 0, technical: 0, billing: 0, other: 0 }
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch analytics data
      const statsPromise = axios.get('http://localhost:5000/api/requests/stats', { withCredentials: true });
      
      // Fetch new requests
      const requestsPromise = axios.get('http://localhost:5000/api/requests?status=NEW', { withCredentials: true });
      
      // Wait for both requests to complete
      const [statsResponse, requestsResponse] = await Promise.all([statsPromise, requestsPromise]);
      
      setStats(statsResponse.data);
      setNewRequests(requestsResponse.data);
      
      // Generate mock chart data for demo purposes
      // In a real implementation, this data would come from the backend
      generateMockChartData();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockChartData = () => {
    // Mock data for weekly requests chart
    const weeklyData = Array(7).fill(0).map(() => Math.floor(Math.random() * 10) + 1);
    
    // Mock data for requests by type
    const typeData = {
      general: Math.floor(Math.random() * 30) + 10,
      technical: Math.floor(Math.random() * 25) + 5,
      billing: Math.floor(Math.random() * 15) + 3,
      other: Math.floor(Math.random() * 10) + 2
    };
    
    setChartData({
      weeklyRequests: weeklyData,
      requestsByType: typeData
    });
  };

  // Calculate the highest value in weekly data for chart scaling
  const maxWeeklyValue = Math.max(...chartData.weeklyRequests, 1);
  
  // Days of the week for chart labels
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button 
          className="px-4 py-2 flex items-center gap-2 border rounded-md hover:bg-gray-100"
          onClick={fetchDashboardData}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Requests</p>
                <h3 className="text-2xl font-bold">{stats.newRequests}</h3>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Response Rate</p>
                <h3 className="text-2xl font-bold">{stats.responseRate}%</h3>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Weekly Requests Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Weekly Requests</h2>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="h-64 flex items-end space-x-2">
                {chartData.weeklyRequests.map((value, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ 
                        height: `${(value / maxWeeklyValue) * 100}%`,
                        minHeight: value > 0 ? '8px' : '0'
                      }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">{daysOfWeek[index]}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Request Types Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Request Types</h2>
                <PieChart className="w-5 h-5 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(chartData.requestsByType).map(([type, count], index) => (
                  <div key={type} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm capitalize">{type}</div>
                      <div className="flex items-center mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                            index === 2 ? 'bg-yellow-500' :
                            'bg-purple-500'
                          }`}
                          style={{ width: `${(count / Object.values(chartData.requestsByType).reduce((a, b) => a + b, 0)) * 100}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 ml-2">{count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* New Requests */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">New Requests</h2>
            
            {newRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {newRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{request.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{request.userName}</div>
                          <div className="text-sm text-gray-500">{request.userEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.type === 'GENERAL' ? 'bg-blue-100 text-blue-800' :
                            request.type === 'TECHNICAL' ? 'bg-green-100 text-green-800' :
                            request.type === 'BILLING' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {request.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">No new requests found</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminsDashboard;
