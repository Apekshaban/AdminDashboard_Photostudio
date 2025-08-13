// React
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Icons
import {
  Home,
  Image,
  Info,
  FileText,
  Package,
  Calendar,
  Camera,
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Gallery", path: "/gallery", icon: Image },
    { name: "About Us", path: "/about-us", icon: Info },
    { name: "Blog", path: "/blog", icon: FileText },
    { name: "Package", path: "/package", icon: Package },
    { name: "Booking", path: "/booking", icon: Calendar },
  ];

  const isActive = (path) => activeItem === path;

  return (
    <aside className="w-72 bg-gradient-to-b from-gray-50 to-white shadow-2xl border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-8 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <Camera size={24} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-bold text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              PhotoStudio
            </h2>
            <p className="text-sm text-gray-500 font-medium">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                to={item.path}
                key={item.name}
                onClick={() => setActiveItem(item.path)}
                className={`
                  relative flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group cursor-pointer transform hover:scale-[1.02]
                  ${active 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25' 
                    : 'text-gray-700 hover:bg-white hover:shadow-md hover:text-red-600'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    p-2 rounded-xl transition-all duration-300
                    ${active 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-500 group-hover:bg-red-50 group-hover:text-red-500'
                    }
                  `}>
                    <Icon size={20} />
                  </div>
                  <span className="font-semibold text-base">{item.name}</span>
                </div>

                {/* Arrow indicator */}
                <ChevronRight 
                  size={16} 
                  className={`
                    transition-all duration-300 transform
                    ${active 
                      ? 'text-white/80 translate-x-0' 
                      : 'text-gray-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-red-500'
                    }
                  `}
                />

                {/* Active indicator line */}
                {active && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Camera size={16} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">Studio Pro</p>
                <p className="text-xs text-white/80">Premium Plan</p>
              </div>
            </div>
            <button className="w-full bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 backdrop-blur-sm">
              Manage Plan
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
