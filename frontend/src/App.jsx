import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { FinanceProvider } from './context/FinanceContext';
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Chart from "./pages/Chart";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LandingPage from "./pages/LandingPage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <FinanceProvider>
      <div className="w-full bg-slate-50 min-h-screen">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Default options for all toasts
            className: '',
            duration: 2000,
            style: {
              background: '#fff',
              color: '#363636',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '14px',
              fontWeight: '500',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
            },
            // Success toast options
            success: {
              style: {
                background: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0',
              },
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            // Error toast options
            error: {
              style: {
                background: '#fef2f2',
                color: '#991b1b',
                border: '1px solid #fecaca',
              },
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={
            <Layout>
              <LandingPage />
            </Layout>
          } />
          
          {/* Public routes */}
          <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          } />
          <Route path="/forgot-password" element={
            <Layout>
              <ForgotPassword />
            </Layout>
          } />
          <Route path="/reset-password/:token" element={
            <Layout>
              <ResetPassword />
            </Layout>
          } />
          
          {/* Protected routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Layout>
                <div className="px-8 sm:px-12 md:px-20 lg:px-24 py-4">
                  <Home />
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <Layout>
                <div className="px-8 sm:px-12 md:px-20 lg:px-24 py-4">
                  <About />
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/chart" element={
            <ProtectedRoute>
              <Layout>
                <div className="px-8 sm:px-12 md:px-20 lg:px-24 py-4">
                  <Chart />
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Layout>
                <div className="px-8 sm:px-12 md:px-20 lg:px-24 py-4">
                  <Contact />
                </div>
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* 404 route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </FinanceProvider>
  );
};

export default App;
