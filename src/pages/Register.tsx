import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    isAgency: true,
  });
  
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };
  
  const handleRadioChange = (value: boolean) => {
    setFormData(prev => ({ ...prev, isAgency: value }));
  };
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }
    
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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(formData);
      navigate('/account');
    } catch (error) {
      setErrors({
        ...errors,
        email: 'Registration failed. Please try again.',
      });
    }
  };
  
  return (
    <AuthLayout 
      title="Create your PopX account"
    >
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <FormInput
          id="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
          error={errors.fullName}
        />
        
        <FormInput
          id="phone"
          label="Phone number"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (123) 456-7890"
          required
          error={errors.phone}
        />
        
        <FormInput
          id="email"
          label="Email address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          error={errors.email}
        />
        
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="8+ characters"
          required
          error={errors.password}
        />
        
        <FormInput
          id="company"
          label="Company name"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
        />
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-purple-600 mb-2">
            Are you an Agency?
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                name="agency"
                checked={formData.isAgency === true}
                onChange={() => handleRadioChange(true)}
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                name="agency"
                checked={formData.isAgency === false}
                onChange={() => handleRadioChange(false)}
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>
        
        <div className="pt-4">
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
                Creating account...
              </span>
            ) : (
              'Create Account'
            )}
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm text-purple-600 hover:text-purple-800">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;