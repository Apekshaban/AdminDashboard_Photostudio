import React, { useState } from "react";
import { Search, Bell, Settings, User, Menu, Camera, ChevronDown } from "lucide-react";

const Navbar = ({ title = "Photo Studio Admin" }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    { id: 1, message: "New booking request from Sarah Johnson", time: "2 min ago", unread: true },
    { id: 2, message: "Payment received for wedding shoot", time: "15 min ago", unread: true },
    { id: 3, message: "Gallery upload completed", time: "1 hour ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section - Logo and Title */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Menu size={20} className="text-gray-600" />
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Camera size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Dashboard</p>
              </div>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients, bookings, photos..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Right Section - Actions and Profile */}
          <div className="flex items-center gap-3">
            {/* Mobile Search */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Search size={20} className="text-gray-600" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <p className="text-sm text-gray-800 mb-1">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings size={20} className="text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-sm">
                  PS
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-800">Photo Studio</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                      <User size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-700">Profile</span>
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
                      <Settings size={16} className="text-gray-600" />
                      <span className="text-sm text-gray-700">Settings</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 text-sm">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isProfileOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Navbar;