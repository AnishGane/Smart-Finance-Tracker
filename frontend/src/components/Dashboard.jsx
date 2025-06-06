import React from "react";
import RevenueCard from "./RevenueCard";
import CategorySummary from "./CategorySummary";
import AlertMessage from "./AlertMessage";
import { useFinance } from "../context/FinanceContext";

const Dashboard = ({ transactions }) => {
  const { currency } = useFinance();

  // Calculate totals with proper number handling
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const remainingBalance = Number(totalIncome) - Number(totalExpenses);

  const renderAlertMessage = () => {
    if (transactions.length === 0) {
      return (
        <AlertMessage 
          message="No transactions yet. Add your first transaction to see your financial summary."
          type="warning"
        />
      );
    }

    if (totalExpenses > totalIncome) {
      return (
        <AlertMessage 
          message="Warning: Your expenses exceed your income! Consider reviewing your spending."
          type="error"
        />
      );
    }

    if (totalIncome > totalExpenses) {
      return (
        <AlertMessage 
          message="Great job! Your income exceeds your expenses. Keep up the good financial management!"
          type="success"
        />
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RevenueCard
          title="Total Income"
          amount={Number(totalIncome)}
          type="income"
          currency={currency}
        />
        <RevenueCard
          title="Total Expenses"
          amount={Number(totalExpenses)}
          type="expense"
          currency={currency}
        />
        <RevenueCard
          title="Balance"
          amount={Number(remainingBalance)}
          type={remainingBalance >= 0 ? "income" : "expense"}
          currency={currency}
        />
      </div>
      {renderAlertMessage()}
      <CategorySummary transactionsData={transactions} />
    </div>
  );
};

export default Dashboard;
