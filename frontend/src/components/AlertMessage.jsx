import React from 'react';

const AlertMessage = ({ message, type = 'warning' }) => {
  const alertStyles = {
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    success: 'bg-green-50 border-green-400 text-green-800'
  };

  return (
    <div className={`p-4 mt-6 rounded-lg border ${alertStyles[type]} flex items-center`}>
      <svg 
        className="w-5 h-5 mr-2" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
          clipRule="evenodd" 
        />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default AlertMessage; 