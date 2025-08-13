import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Camera, 
  Edit, 
  Trash2, 
  Plus, 
  X, 
  Search,
  Filter,
  Eye
} from 'lucide-react';

const AdminBookingDashboard = () => {
  // Sample booking data - in real app, this would come from API
  const [bookings, setBookings] = useState([
    {
      id: 1,
      clientName: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+1234567890",
      eventType: "Wedding",
      eventDate: "2025-09-15",
      eventTime: "14:00",
      location: "Central Park, NYC",
      status: "confirmed",
      notes: "Outdoor ceremony, backup indoor location needed",
      createdAt: "2025-08-01"
    },
    {
      id: 2,
      clientName: "Michael Chen",
      email: "michael@email.com",
      phone: "+1234567891",
      eventType: "Corporate Event",
      eventDate: "2025-08-25",
      eventTime: "10:00",
      location: "Downtown Conference Center",
      status: "pending",
      notes: "Product launch event, need multiple photographers",
      createdAt: "2025-08-10"
    },
    {
      id: 3,
      clientName: "Emily Rodriguez",
      email: "emily@email.com",
      phone: "+1234567892",
      eventType: "Portrait Session",
      eventDate: "2025-08-20",
      eventTime: "16:00",
      location: "Studio",
      status: "completed",
      notes: "Family portrait session",
      createdAt: "2025-07-25"
    }
  ]);

  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    location: "",
    status: "pending",
    notes: ""
  });

  const eventTypes = ["Wedding", "Portrait Session", "Corporate Event", "Birthday Party", "Anniversary", "Other"];
  const statusTypes = ["pending", "confirmed", "completed", "cancelled"];

  // Filter bookings based on search and status
  useEffect(() => {
    let filtered = bookings.filter(booking => {
      const matchesSearch = booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           booking.eventType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      clientName: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      eventTime: "",
      location: "",
      status: "pending",
      notes: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setBookings(prev => prev.map(booking => 
        booking.id === currentBooking.id 
          ? { ...booking, ...formData }
          : booking
      ));
    } else {
      const newBooking = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setBookings(prev => [...prev, newBooking]);
    }
    setShowModal(false);
    resetForm();
    setCurrentBooking(null);
    setIsEditing(false);
  };

  const handleEdit = (booking) => {
    setCurrentBooking(booking);
    setFormData(booking);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(prev => prev.filter(booking => booking.id !== id));
    }
  };

  const handleView = (booking) => {
    setCurrentBooking(booking);
    setShowViewModal(true);
  };

  const handleAdd = () => {
    resetForm();
    setIsEditing(false);
    setCurrentBooking(null);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-red-600 mb-2">Booking Management</h1>
            <p className="text-gray-600">Manage all your photography bookings</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add New Booking
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by client name, email, or event type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">All Status</option>
              {statusTypes.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {statusTypes.map(status => {
          const count = bookings.filter(booking => booking.status === status).length;
          return (
            <div key={status} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 capitalize">{status} Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`p-3 rounded-full ${getStatusColor(status)}`}>
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-600">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-600">Event</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-600">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-600">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-red-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-gray-900">{booking.clientName}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {booking.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {booking.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-red-600" />
                        <span className="font-medium">{booking.eventType}</span>
                      </div>
                      <div className="text-sm text-gray-500">{booking.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{booking.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{booking.eventTime}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(booking)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(booking)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Booking"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-red-600">
                  {isEditing ? 'Edit Booking' : 'Add New Booking'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Time *
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter event location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {statusTypes.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter any additional notes..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  {isEditing ? 'Update Booking' : 'Create Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && currentBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-red-600">Booking Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Client Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {currentBooking.clientName}</p>
                    <p><span className="font-medium">Email:</span> {currentBooking.email}</p>
                    <p><span className="font-medium">Phone:</span> {currentBooking.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Event Details</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Type:</span> {currentBooking.eventType}</p>
                    <p><span className="font-medium">Date:</span> {currentBooking.eventDate}</p>
                    <p><span className="font-medium">Time:</span> {currentBooking.eventTime}</p>
                    <p><span className="font-medium">Location:</span> {currentBooking.location}</p>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-700 mb-2">Status</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentBooking.status)}`}>
                    {currentBooking.status.charAt(0).toUpperCase() + currentBooking.status.slice(1)}
                  </span>
                </div>

                {currentBooking.notes && (
                  <div className="md:col-span-2">
                    <h4 className="font-semibold text-gray-700 mb-2">Notes</h4>
                    <p className="text-gray-600">{currentBooking.notes}</p>
                  </div>
                )}

                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-700 mb-2">Created</h4>
                  <p className="text-gray-600">{currentBooking.createdAt}</p>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEdit(currentBooking);
                  }}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingDashboard;