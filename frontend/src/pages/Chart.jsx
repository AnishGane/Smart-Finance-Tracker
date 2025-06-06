import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useFinance } from '../context/FinanceContext';
import Loading from '../components/Loading';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { transactions, loading: contextLoading, fetchChartData } = useFinance();
  const [isLoading, setIsLoading] = useState(true);
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('month');
  const [chartData, setChartData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    // Fetch chart data when component mounts
    fetchChartData();
  }, []);

  useEffect(() => {
    if (!contextLoading && transactions !== undefined) {
      console.log('Current chart data:', transactions); // Debug log
      setIsLoading(false);
      
      if (transactions) {
        setChartData(transactions.lineData);
        setDoughnutData(transactions.doughnutData);
        setSummary(transactions.summary);
      } else {
        console.log('No chart data available'); // Debug log
        setChartData(null);
        setDoughnutData(null);
        setSummary(null);
      }
    }
  }, [transactions, contextLoading]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Financial Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },
  };

  if (isLoading || contextLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Analytics</h1>
        <div className="flex gap-4">
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="doughnut">Doughnut Chart</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg" style={{ height: '400px' }}>
        {transactions ? (
          <>
            {transactions.noDataMessage ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">{transactions.noDataMessage}</p>
              </div>
            ) : (
              <>
                {chartType === 'line' && chartData && (
                  <Line data={chartData} options={chartOptions} />
                )}
                {chartType === 'bar' && transactions.barData && (
                  <Bar data={transactions.barData} options={chartOptions} />
                )}
                {chartType === 'doughnut' && doughnutData && (
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                )}
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">No transactions found. Add some transactions to see your financial analytics.</p>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span>Total Income:</span>
              <span className="text-green-600">
                ${summary?.totalIncome?.toFixed(2) || '0.00'}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Total Expenses:</span>
              <span className="text-red-600">
                ${summary?.totalExpense?.toFixed(2) || '0.00'}
              </span>
            </p>
            <p className="border-t border-gray-600 pt-2 mt-2 flex justify-between font-semibold">
              <span>Net Balance:</span>
              <span className={summary?.netBalance >= 0 ? 'text-green-600' : 'text-red-600'}>
                ${summary?.netBalance?.toFixed(2) || '0.00'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
