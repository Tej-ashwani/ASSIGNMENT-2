import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/account" />;
  }

  return (
    <AuthLayout 
      title="Welcome to PopX"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <div className="space-y-4 mt-8">
        <Link to="/register">
          <Button variant="primary" fullWidth>
            Create Account
          </Button>
        </Link>
        
        <Link to="/login">
          <Button variant="secondary" fullWidth>
            Already Registered? Login
          </Button>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Welcome;