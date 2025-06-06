import React, { useState, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";

const TransactionForm = ({ currentTransaction, onSave, onCancel }) => {
  const { currency } = useFinance();
  const [description, setDescription] = useState(currentTransaction?.description || '');
  const [amount, setAmount] = useState(currentTransaction?.amount || '');
  const [type, setType] = useState(currentTransaction?.type || 'expense');
  const [category, setCategory] = useState(currentTransaction?.category || '');
  const [date, setDate] = useState(currentTransaction?.date || new Date().toISOString().split('T')[0]);

  useEffect(() => {
    if (currentTransaction) {
      setDescription(currentTransaction.description);
      setAmount(Number(currentTransaction.amount).toFixed(2));
      setType(currentTransaction.type);
      setCategory(currentTransaction.category);
      setDate(currentTransaction.date);
    } else {
      // Reset form if no currentTransaction (for new transaction)
      setDescription('');
      setAmount('');
      setType('expense');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [currentTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || Number(amount) <= 0) {
      console.error('Please fill in all fields with valid values.');
      return;
    }

    const transactionData = {
      description,
      amount: Number(Number(amount).toFixed(2)), // Ensure amount is a number with 2 decimal places
      type,
      category: type === 'expense' ? category : '', // Only apply category for expenses
      date,
    };

    if (currentTransaction) {
      // If editing, include the ID
      onSave({ ...transactionData, id: currentTransaction.id });
    } else {
      // If adding new, do NOT include the ID
      onSave(transactionData);
    }

    // Reset form after saving
    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and one decimal point
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  return (
    <div className="bg-white p-1 sm:p-6 rounded-xl mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {currentTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="amount">
            Amount ({currency})
          </label>
          <input
            type="text"
            id="amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
            value={amount}
            onChange={handleAmountChange}
            required
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        {type === 'expense' && (
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="E.g. Food, Travel"
            />
          </div>
        )}
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 outline-none focus:border-black focus:ring-2 focus:ring-gray-200"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="mt-4 flex-1 bg-gray-600 hover:bg-gray-800 cursor-pointer text-white font-bold py-4 shadow-lg transition duration-300 ease-in-out transform outline-none focus:ring-2 focus:ring-blue-200"
          >
            {currentTransaction ? 'Update Transaction' : 'Add Transaction'}
          </button>
          {currentTransaction && (
            <button
              type="button"
              onClick={onCancel}
              className=" mt-4 flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 outline-none focus:ring-2 focus:ring-gray-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;