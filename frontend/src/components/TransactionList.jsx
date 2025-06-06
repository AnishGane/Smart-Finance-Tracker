import React from 'react';
import { useFinance } from '../context/FinanceContext';

const TransactionList = ({ transactions, onUpdateTransaction, onDeleteTransaction, onEditTransaction }) => {
  const { currency } = useFinance();

  const formatAmount = (amount) => {
    return Number(amount).toFixed(2);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200 font-bold">
          <tr>
            <th className="px-6 py-3 text-center text-xs text-gray-700 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-center text-xs text-gray-700 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-center text-xs text-gray-700 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-center text-xs text-gray-700 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-center text-xs text-gray-700 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-center text-xs text-gray-700 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr className='text-center' key={transaction._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(transaction.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.category || '-'}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {currency} {formatAmount(transaction.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`py-1 px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {transaction.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEditTransaction(transaction)}
                  className="text-indigo-600 cursor-pointer hover:text-indigo-900 mr-4 bg-indigo-100 px-3 py-1 hover:bg-indigo-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteTransaction(transaction._id)}
                  className="text-red-600 cursor-pointer hover:text-red-900 bg-red-100 px-3 py-1 hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList; 