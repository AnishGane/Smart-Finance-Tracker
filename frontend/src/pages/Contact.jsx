import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { api } = useFinance();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await api.post('/api/contact', formData);
      const data = response.data;

      if (response.status === 200) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Failed to send message. Please check your internet connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col items-center justify-center h-full p-1 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              Have questions or need assistance? We're here to help! Fill out the form below
              and we'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-12 sm:p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300 shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Email Us</h3>
              <p className="text-gray-600">support@fintrack.com</p>
            </div>
            <div className="bg-white p-12 sm:p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300 shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Call Us</h3>
              <p className="text-gray-600">+977 9827785080</p>
            </div>
            <div className="bg-white p-12 sm:p-6 rounded-lg text-center hover:transform hover:scale-105 transition-all duration-300 shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Visit Us</h3>
              <p className="text-gray-600">Doodhpati, Bhaktapur, Nepal</p>
            </div>
          </div>

          {/* Status Message */}
          {status.message && (
            <div
              className={`p-4 rounded-md ${
                status.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
              onAnimationEnd={() => setStatus({ type: '', message: '' })}
              style={{ animation: 'fadeOut 2s forwards' }}
            >
              {status.message}
            </div>
          )}
          <style>
            {`
              @keyframes fadeOut {
                0% { opacity: 1; }
                70% { opacity: 1; }
                100% { opacity: 0; }
              }
            `}
          </style>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="mt-1 block p-2 border-2 border-gray-400 w-full rounded-md shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@xyz.com"
                    className="mt-1 block w-full rounded-md p-2 border-2 border-gray-400 shadow-sm focus:border-black focus:ring-black"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  className="mt-1 block w-full rounded-md p-2 border-2 border-gray-400 shadow-sm focus:border-black focus:ring-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  rows="4"
                  className="mt-1 block w-full rounded-md p-2 border-2 border-gray-400 shadow-sm focus:border-black focus:ring-black"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`border-2 border-black text-black px-8 py-3 rounded-sm font-semibold hover:bg-black hover:text-white cursor-pointer transition-colors duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;