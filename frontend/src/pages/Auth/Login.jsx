import React, { useState } from 'react';
import Authlayout from '../../components/laypout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Inputs';
import { validateEmail } from '../../Utilis/helper.js';
import axiosInstance from '../../Utilis/axiosInstance.js';
import { API_PATHS } from '../../Utilis/apiPaths.js';
import { toast, Toaster } from 'react-hot-toast'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      const message = 'Please enter a valid email address.';
      setError(message);
      toast.error(message); 
      return;
    }

    if (!password) {
      const message = "Please enter a password!";
      setError(message);
      toast.error(message); 
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      // 1. Token aur User Data ko store karein
      localStorage.setItem("token", token);
      
      // 2. User object mein password nahi aana chahiye (Backend se ensure karein)
      localStorage.setItem("user", JSON.stringify(user)); 

      toast.success("Login successful!");

      navigate('/dashboard');

    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      console.error("❌ Login failed:", error.response?.data || error.message);
      setError(message);
      toast.error(message); 
    } finally {
      setIsLoading(false); // ⬅️ Stop loading
    }
  };

  return (
    <Authlayout>
      <Toaster />
      <div className='lg:w[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}

            onChange={({ target }) => setEmail(target.value)} 
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
       
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button 
            type='submit' 
            className='btn-primary' 
            disabled={isLoading}
          >
            {isLoading ? 'LOADING...' : 'LOGIN'} 
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{' '}
            <Link className='font-medium text-primary underline' to={'/signUp'}>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default Login;