import React, { useState, useEffect } from "react";
import { Search, Eye, Edit, Trash2, Plus, X, Check, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import { showNotification } from "@mantine/notifications";
import { Modal, Table, Pagination } from "@mantine/core";

const EventRecordsData = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch event registrations
  useEffect(() => {
    const fetchEventRegistrations = async () => {
      try {
        const response = await axios.get(`${api.web}api/v1/events/registrations`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching event registrations:', error);
        showNotification({
          color: 'red',
          title: 'Error',
          message: 'Failed to load event registrations',
          icon: <X size={16} />,
        });
      }
    };
    fetchEventRegistrations();
  }, []);

  // Filter records based on search term
  const filteredRecords = records.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.name?.toLowerCase().includes(searchLower) ||
      record.email?.toLowerCase().includes(searchLower) ||
      record.phone?.toLowerCase().includes(searchLower) ||
      record.eventName?.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // Handle delete
  const handleDelete = async () => {
    if (!recordToDelete) return;

    try {
      await axios.delete(`${api.web}api/v1/events/registrations/${recordToDelete._id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setRecords(records.filter(record => record._id !== recordToDelete._id));
      setDeleteModalOpen(false);
      
      showNotification({
        color: 'teal',
        title: 'Success',
        message: 'Event registration deleted successfully!',
        icon: <Check size={16} />,
      });
    } catch (error) {
      console.error('Error deleting event registration:', error);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to delete event registration',
        icon: <X size={16} />,
      });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Event Registrations
          </h1>
          <button
            onClick={() => navigate('/admin/event-records')}
            className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by name, email, phone, or event..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Event</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((record) => (
                    <tr key={record._id}>
                      <td className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{record.name}</div>
                          <div className="text-xs text-gray-500">{record.userId || 'N/A'}</div>
                        </div>
                      </td>
                      <td>{record.eventName}</td>
                      <td>{record.email}</td>
                      <td>{record.phone}</td>
                      <td className="font-medium text-green-600">
                        {formatCurrency(record.amountPaid)}
                      </td>
                      <td>{formatDate(record.dateOfRegistration)}</td>
                      <td className="text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedRecord(record);
                              setShowDetails(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate('/admin/event-records', { state: { isEdit: true, record } })}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setRecordToDelete(record);
                              setDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      {searchTerm ? 'No matching records found' : 'No event registrations found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                position="center"
                withEdges
                className="mt-4"
              />
            </div>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      <Modal
        opened={showDetails}
        onClose={() => setShowDetails(false)}
        title="Event Registration Details"
        size="lg"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{selectedRecord.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p>{selectedRecord.userId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedRecord.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedRecord.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Event Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Event Name</p>
                  <p>{selectedRecord.eventName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Paid</p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(selectedRecord.amountPaid)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p>{formatDate(selectedRecord.dateOfRegistration)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Event Registration"
        size="md"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the registration for <span className="font-semibold">{recordToDelete?.name}</span>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventRecordsData;