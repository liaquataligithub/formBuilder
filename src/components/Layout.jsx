import React from 'react';
import { LayoutGrid, Trello } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-8">Dashboard</h1>
          <nav className="space-y-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
              <span>Form Builder</span>
            </Link>
            <Link
              to="/kanban"
              className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                location.pathname === '/kanban' 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Trello className="w-5 h-5" />
              <span>Kanban Board</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
} 