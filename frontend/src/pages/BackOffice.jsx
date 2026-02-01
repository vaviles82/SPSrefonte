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

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/requests/getall");
      const data = await response.json();
      console.log("data", data);
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateItem = async (id, status, reqstatus) => {
    if (reqstatus == "completed" && status == "lu") {
      navigate(`/admin/requests/${id}`);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log("Item updated successfully");
      fetchRequests(); // Refresh the data after updating
      navigate(`/admin/requests/${id}`);
      console.log(response);
      return response.json();
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log("Item deleted successfully");
      fetchRequests();
      return response.json();
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className="hover:bg-red-50 cursor-pointer"
                    onClick={() => {
                      updateItem(request.id, "lu", request.status);
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {request.company}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {request.first_name} {request.last_name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Mail className="w-4 h-4 mr-1" />
                        {request.userEmail}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Phone className="w-4 h-4 mr-1" />
                        {request.phone_number}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {request.content}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Newsletter: {request.newsletter ? "No" : "Yes"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                 {/*    <td className="px-6 py-4 text-sm text-gray-500">
                      <button
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem(request.id);
                        }}
                      >
                        X
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateItem(request.id, "completed", request.status);
                        }}
                      >
                        completer
                      </button>
                    </td> */}
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
