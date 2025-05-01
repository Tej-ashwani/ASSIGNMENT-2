import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
}) => {
  const baseStyles = 'font-medium rounded-md focus:outline-none transition-all duration-200 py-3 px-4';
  
  const variantStyles = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50',
    secondary: 'bg-purple-100 text-purple-700 hover:bg-purple-200 focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;