import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  LayoutDashboard,
} from "lucide-react";

function BackOffice() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  
  // Récupération du token stocké lors du login
  const token = localStorage.getItem('token');

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        headers: {
          'Authorization': `Bearer ${token}` // Transmission du jeton pour authentification
        }
      });
      
      if (response.status === 401 || response.status === 403) {
        navigate("/login"); // Redirection si non autorisé (Sécurité)
        return;
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchRequests();
    }
  }, [token]);

  const updateItem = async (id, status, reqstatus) => {
    if (reqstatus === "completed" && status === "lu") {
      navigate(`/admin/requests/${id}`);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchRequests(); 
      navigate(`/admin/requests/${id}`);
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      fetchRequests();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "lu":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Requests Dashboard
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Requests</h2>
              <div className="text-sm text-gray-500">
                Total: {requests.length}
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-blue-50 cursor-pointer"
                    onClick={() => updateItem(request.id, "lu", request.status)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.company || "N/A"}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{request.first_name} {request.last_name}</div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Mail className="w-4 h-4 mr-1" /> {request.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{request.content}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">{request.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BackOffice;