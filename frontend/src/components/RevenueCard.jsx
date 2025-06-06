import React from "react";
import { useFinance } from "../context/FinanceContext";

const RevenueCard = ({ title, amount, type }) => {
  const { currency } = useFinance();

  const formatAmount = (value) => {
    return Number(value).toFixed(2);
  };

  return (
    <div className={`p-4 sm:p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg
      ${type === 'expense' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className={`text-xl sm:text-2xl font-bold ${type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
        {type === 'expense' ? '-' : '+'}{currency}{formatAmount(Math.abs(amount))}
      </p>
    </div>
  );
};

export default RevenueCard;
