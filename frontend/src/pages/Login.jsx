import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { setToken, setUserName, token, handleTokenExpiration, api } = useFinance();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Only redirect if token exists and we're not already on the login page
    if (token && window.location.pathname === '/login') {
      navigate('/home');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (currentState === "Sign up") {
        const response = await api.post('/api/user/register', {
          name,
          email,
          password
        });
        if (response.data.success) {
          toast.success("Registration successful! Please login.", {
            duration: 2000,
            position: 'bottom-right',
          });
          setCurrentState("Login");
          // Clear form
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(response.data.message || "Registration failed", {
            duration: 2000,
            position: 'bottom-right',
          });
        }
      } else {
        const response = await api.post('/api/user/login', {
          email,
          password
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          // Store user name
          setUserName(response.data.user.name);
          localStorage.setItem("userName", response.data.user.name);
          toast.success("Login successful!", {
            duration: 2000,
            position: 'bottom-right',
          });
          navigate("/home");
        } else {
          toast.error(response.data.message || "Login failed", {
            duration: 2000,
            position: 'bottom-right',
          });
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      if (error.response?.status === 401) {
        handleTokenExpiration();
        navigate('/login');
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Invalid input data", {
          duration: 2000,
          position: 'bottom-right',
        });
      } else {
        toast.error("An error occurred. Please try again.", {
          duration: 2000,
          position: 'bottom-right',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading fullScreen={true} />;
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-0.5 w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? "" : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name} 
          type="text" 
          className='w-full px-3 py-2 border border-gray-800 outline-none' 
          placeholder='Name' 
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email} 
        type="email"
        className='w-full px-3 py-2 border border-gray-800 outline-none' 
        placeholder='Email address' 
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password} 
        type="password"
        className='w-full px-3 py-2 border border-gray-800 outline-none' 
        placeholder='Password' 
        required
      />
      <button
        type="submit"
        className='w-full bg-gray-800 text-white py-2 cursor-pointer hover:bg-gray-700 transition duration-300'
      >
        {currentState}
      </button>
      <p className="text-sm  ">
        {currentState === 'Login' ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={() => setCurrentState(currentState === 'Login' ? 'Sign up' : 'Login')}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {currentState === 'Login' ? 'Sign up' : 'Login'}
        </button>
      </p>
      {currentState === 'Login' && (
        <Link to="/forgot-password" className="text-sm  cursor-pointer text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      )}
    </form>
  );
};

export default Login;
