import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '../context/FinanceContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useFinance();

  const handleGetStarted = () => {
    if (token) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  // If user is already logged in, redirect to home
  React.useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Take Control of Your <span className="text-gray-800">Financial Future</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Smart Finance Tracker helps you manage your expenses, track your income, and make informed financial decisions with ease.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Free
          </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
            <p className="text-gray-600">
              Get detailed insights into your spending patterns and financial health with our advanced analytics.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">Expense Tracking</h3>
            <p className="text-gray-600">
              Easily track your income and expenses with detailed categorization and real-time updates.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3">Mobile Friendly</h3>
            <p className="text-gray-600">
              Access your finances anywhere, anytime with our responsive and intuitive design.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account in seconds</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2">Add Transactions</h3>
              <p className="text-gray-600">Start tracking your income and expenses</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2">Analyze</h3>
              <p className="text-gray-600">View insights and track your progress</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-800 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold mb-2">Grow</h3>
              <p className="text-gray-600">Make better financial decisions</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Why Choose Us?</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Real-time expense tracking</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Detailed financial analytics</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Secure and private</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>User-friendly interface</span>
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Key Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Better financial awareness</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Improved budgeting</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Track spending habits</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Make informed decisions</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-gray-800 text-white p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances smarter with our platform.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-gray-800 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Managing Your Finances Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
