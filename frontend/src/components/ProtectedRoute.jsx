import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useFinance();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 