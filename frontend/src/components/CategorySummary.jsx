import React from "react";
import { useFinance } from "../context/FinanceContext";

const CategorySummary = ({ transactionsData }) => {
  const { currency } = useFinance();

  // Filter and group expense transactions by category
  const categoryTotals = transactionsData
    .filter(transaction => transaction.type === "expense")
    .reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = {
          amount: 0,
          type: transaction.type,
          color: transaction.color,
        };
      }
      acc[transaction.category].amount += parseFloat(transaction.amount);
      return acc;
    }, {});

  // Format all category amounts to 2 decimal places
  Object.keys(categoryTotals).forEach(category => {
    categoryTotals[category].amount = parseFloat(categoryTotals[category].amount.toFixed(2));
  });

  const hasExpenses = Object.keys(categoryTotals).length > 0;

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-4">Spending by Category</h2>
      {!hasExpenses ? (
        <p className="text-gray-500 text-start">
          No expenses to display by category yet.
        </p>
      ) : (
        <div className="w-full flex flex-col gap-3">
          {Object.entries(categoryTotals).map(([category, data]) => (
            <div
              key={category}
              className="p-4 bg-gray-100 flex justify-between rounded-md transition-all duration-300 hover:shadow-md"
            >
              <h3
                className="text-lg font-medium mb-2"
              >
                {category}
              </h3>
              <p className="text-lg font-semibold tracking-wider pr-2 text-red-600">
                -{currency}
                {Number(data.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySummary;
