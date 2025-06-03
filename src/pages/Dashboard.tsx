import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { logout } from '../services/auth';

const Dashboard: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          
          <div className="flex items-center">
            <span className="mr-4 text-sm font-medium text-gray-700">
              Welcome, {user?.name || 'User'}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Protected Content
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This page is only accessible to authenticated users.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <p className="text-gray-700">
              Your secure content goes here. This area is protected by JWT authentication.
            </p>
            
            <div className="mt-4 bg-gray-50 p-4 rounded-md">
              <h3 className="text-md font-medium text-gray-900">Your User Information:</h3>
              <pre className="mt-2 text-sm text-gray-700 overflow-auto p-2 bg-gray-100 rounded">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;