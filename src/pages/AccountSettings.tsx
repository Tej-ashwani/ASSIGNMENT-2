import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { UserCircle, Upload, LogOut } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Account Settings</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                {user.avatar ? (
                  <img 
                    src={user.avatar}
                    alt={user.fullName}
                    className="h-24 w-24 rounded-full object-cover border-4 border-purple-100"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-purple-100 flex items-center justify-center">
                    <UserCircle className="h-16 w-16 text-purple-500" />
                  </div>
                )}
                
                <button 
                  className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-1 text-white transform translate-x-1/4 hover:bg-purple-700 transition-colors"
                  onClick={() => console.log('Upload avatar')}
                >
                  <Upload size={16} />
                </button>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                <p className="text-gray-600">{user.email}</p>
                {user.isAgency && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-2">
                    Agency
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-8 border-t pt-6">
              <p className="text-gray-700 leading-relaxed">
                Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat. Sed Diam
              </p>
            </div>
            
            <div className="mt-8 border-t pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company</h3>
                  <p className="mt-1 text-sm text-gray-900">{user.company || 'Not specified'}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? 'Cancel' : 'Edit Profile'}
              </Button>
              
              <Button 
                variant="secondary"
                onClick={logout}
                className="flex items-center justify-center"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;