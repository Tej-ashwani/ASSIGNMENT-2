import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(formData.email, formData.password);
      navigate('/account');
    } catch (error) {
      setErrors({
        email: 'Invalid email or password',
        password: 'Invalid email or password',
      });
    }
  };
  
  return (
    <AuthLayout 
      title="Signin to your PopX account"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
          error={errors.email}
        />
        
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          error={errors.password}
        />
        
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          ) : (
            'Login'
          )}
        </Button>
        
        <div className="text-center mt-4">
          <Link to="/register" className="text-sm text-purple-600 hover:text-purple-800">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;