import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../Api/api";

const AdminControl = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${api.web}api/v1/getAllUsers`);
      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        setMessage({ text: "Failed to fetch users", type: "error" });
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage({ text: "Error fetching users", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdminStatus = async (userId, adminLevel) => {
    try {
      const res = await axios.post(`${api.web}api/v1/updateAdminStatus`, {
        _id: userId,
        admin: adminLevel
      });
      
      if (res.data.success) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, admin: adminLevel } : user
        ));
        setMessage({ 
          text: `Admin status updated to ${adminLevel === 1 ? 'Admin1' : adminLevel === 2 ? 'Admin2' : 'User'}`, 
          type: "success" 
        });
      } else {
        setMessage({ text: res.data.message || "Update failed", type: "error" });
      }
    } catch (err) {
      console.error("Error updating admin status:", err);
      setMessage({ text: "Error updating admin status", type: "error" });
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Control</h1>
            <p className="text-blue-100">Manage user admin access levels</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
  {/* Admin Dashboard Quick Links */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
    <a href="/admin/internshipRecords" className="block bg-blue-50 hover:bg-blue-100 transition p-6 rounded-lg shadow flex items-center gap-4">
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.5c0 4.694-3.806 8.5-8.5 8.5S4 18.194 4 13.5a12.083 12.083 0 012.84-2.922L12 14z"/></svg>
      <div>
        <div className="font-bold text-blue-900">Internship Records</div>
        <div className="text-xs text-blue-700">Manage Intern profiles</div>
      </div>
    </a>
    <a href="/admin/projectRecordsData" className="block bg-green-50 hover:bg-green-100 transition p-6 rounded-lg shadow flex items-center gap-4">
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" /></svg>
      <div>
        <div className="font-bold text-green-900">Project Records</div>
        <div className="text-xs text-green-700">Manage Project Discovery applications</div>
      </div>
    </a>
  </div>
        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <span className="mr-2">
              {message.type === "success" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            {message.text}
          </div>
        )}

        {/* Search and Refresh */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-[#3f6197] text-white rounded-lg hover:bg-[#2c4b79] flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Users Table */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No users found</h3>
            <p className="text-gray-500">There are currently no users in the system.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.profilePhoto?.data ? (
                            <img 
                              className="h-10 w-10 rounded-full mr-3 object-cover" 
                              src={`${api.web}api/v1/profileImage/${user._id}`} 
                              alt="Profile"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/40?text=User';
                              }}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-xl text-gray-500">{user.name?.charAt(0)}</span>
                            </div>
                          )}
                          <div className="text-sm font-medium text-gray-900">{user.name || "N/A"}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.organizationName || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.admin === 2 ? "bg-purple-100 text-purple-800" : 
                          user.admin === 1 ? "bg-blue-100 text-blue-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {user.admin === 2 ? "Admin2" : user.admin === 1 ? "Admin1" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateAdminStatus(user._id, 0)}
                            className={`px-2 py-1 rounded ${
                              user.admin === 0 
                                ? "bg-gray-200 text-gray-600 cursor-not-allowed" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            disabled={user.admin === 0}
                          >
                            User
                          </button>
                          <button
                            onClick={() => updateAdminStatus(user._id, 1)}
                            className={`px-2 py-1 rounded ${
                              user.admin === 1 
                                ? "bg-blue-200 text-blue-600 cursor-not-allowed" 
                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            }`}
                            disabled={user.admin === 1}
                          >
                            Admin1
                          </button>
                          <button
                            onClick={() => updateAdminStatus(user._id, 2)}
                            className={`px-2 py-1 rounded ${
                              user.admin === 2 
                                ? "bg-purple-200 text-purple-600 cursor-not-allowed" 
                                : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                            }`}
                            disabled={user.admin === 2}
                          >
                            Admin2
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 space-x-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1 
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  &laquo;
                </button>
                
                {[...Array(totalPages).keys()].map(number => (
                  <button
                    key={number + 1}
                    onClick={() => setCurrentPage(number + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === number + 1
                        ? "bg-[#3f6197] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminControl;