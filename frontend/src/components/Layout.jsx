import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <div className="w-full sm:py-4 py-3 h-16 px-8 sm:px-12 md:px-20 lg:px-24">
        <Navbar />
      </div>
      {children}
    </div>
  );
};

export default Layout; 