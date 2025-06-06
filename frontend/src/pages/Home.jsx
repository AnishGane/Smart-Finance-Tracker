import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { useFinance } from '../context/FinanceContext';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { api } = useFinance();
  const navigate = useNavigate();

  // Check token and fetch data on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/api/transactions/all');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          toast.error(error.response?.data?.message || 'Failed to fetch transactions', {
            duration: 2000,
            position: 'bottom-right',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Only run on mount

  const handleSaveTransaction = async (transactionData) => {
    try {
      setIsLoading(true);
      if (selectedTransaction) {
        // Update existing transaction
        const response = await api.put(`/api/transactions/update/${selectedTransaction._id}`, transactionData);
        setTransactions(transactions.map(transaction => 
          transaction._id === selectedTransaction._id ? response.data.transaction : transaction
        ));
        toast.success('Transaction updated successfully', {
          duration: 2000,
          position: 'bottom-right',
        });
      } else {
        // Add new transaction
        const response = await api.post('/api/transactions/add', transactionData);
        setTransactions([...transactions, response.data.transaction]);
        toast.success('Transaction added successfully', {
          duration: 2000,
          position: 'bottom-right',
        });
      }
      setSelectedTransaction(null); // Reset selected transaction after save
    } catch (error) {
      console.error('Error saving transaction:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to save transaction', {
          duration: 2000,
          position: 'bottom-right',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.delete(`/api/transactions/delete/${id}`);
      
      if (response.data.success) {
        setTransactions(transactions.filter(t => t._id !== id));
        toast.success('Transaction deleted successfully', {
          duration: 2000,
          position: 'bottom-right',
        });
      } else {
        toast.error(response.data.message || 'Failed to delete transaction', {
          duration: 2000,
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete transaction', {
          duration: 2000,
          position: 'bottom-right',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setSelectedTransaction(null);
  };

  if (isLoading) {
    return <Loading fullScreen={true} />;
  }

  return (
    <div className="py-8">
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <Dashboard transactions={transactions} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <TransactionForm 
            currentTransaction={selectedTransaction}
            onSave={handleSaveTransaction}
            onCancel={handleCancelEdit}
          />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <TransactionList 
            transactions={transactions}
            onUpdateTransaction={handleSaveTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={setSelectedTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
