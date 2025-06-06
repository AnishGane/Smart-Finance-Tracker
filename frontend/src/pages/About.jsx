import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full mt-4">
      <div className="w-full mt-2">
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Mission Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                At FinTrack, we believe that financial freedom starts with
                understanding your money. Our mission is to empower individuals
                with the tools and insights they need to make informed financial
                decisions and achieve their financial goals.
              </p>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Smart Tracking
                </h3>
                <p className="text-gray-600">
                  Easily track your income and expenses with our intuitive
                  interface
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Visual Analytics
                </h3>
                <p className="text-gray-600">
                  Get clear insights through interactive charts and reports
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300 shadow-md">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Secure & Private
                </h3>
                <p className="text-gray-600">
                  Your financial data is protected with enterprise-grade
                  security
                </p>
              </div>
            </div>

            {/* Team Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Our Team</h2>
              <p className="text-gray-600 leading-relaxed">
                We're a passionate team of financial experts and technology
                innovators dedicated to making personal finance management
                accessible to everyone.
              </p>
            </div>

            {/* Contact Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
              <p className="text-gray-600 leading-relaxed">
                Have questions or suggestions? We'd love to hear from you!
              </p>
              <Link to="/contact">
                <button className="border-2 border-black text-black px-8 py-3 rounded-sm font-semibold hover:bg-black hover:text-white cursor-pointer transition-colors duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
