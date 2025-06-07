import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const FinanceContext = createContext();

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const FinanceProvider = ({ children }) => {
  const [currency, setCurrency] = useState('₹');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem('token') || "");
  const [userName, setUserName] = useState(localStorage.getItem('userName') || "");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  // Function to handle token expiration
  const handleTokenExpiration = () => {
    setToken("");
    setUserName("");
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    toast.error('Session expired. Please login again.', {
      duration: 2000,
      position: 'bottom-right',
    });
  };

  // Function to verify token validity
  const verifyToken = async () => {
    try {
      const response = await api.get('/api/user/verify-token');
      return response.data.success;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  };

  // Fetch chart data
  const fetchChartData = async () => {
    try {
      const response = await api.get('/api/chart/data');
      if (response.data && response.data.success) {
        setTransactions(response.data.data);
      } else {
        console.error('Invalid chart data received:', response.data);
        setTransactions([]);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
      toast.error('Failed to fetch chart data', {
        duration: 2000,
        position: 'bottom-right',
      });
      setTransactions([]);
    }
  };

  // Initialize token and set axios headers on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const isValid = await verifyToken();
        if (isValid) {
          setToken(storedToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          fetchChartData();
        } else {
          handleTokenExpiration();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // Update axios headers when token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchChartData();
    } else {
      delete api.defaults.headers.common['Authorization'];
      setTransactions([]);
    }
  }, [token]);

  // Add response interceptor for handling 401 errors
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const isValid = await verifyToken();
          if (!isValid) {
            handleTokenExpiration();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const value = {
    currency,
    setCurrency,
    backendUrl,
    token,
    setToken,
    userName,
    setUserName,
    handleTokenExpiration,
    api,
    loading,
    transactions,
    setTransactions,
    fetchChartData
  };

  return (
    <FinanceContext.Provider value={value}>
      {!loading && children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
