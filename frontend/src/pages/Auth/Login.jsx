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

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      toast.error('Please enter a valid email address.'); 
      return;
    }

    if (!password) {
      setError("Please enter a password!");
      toast.error("Please enter a password!"); 
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

 
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!"); 

   
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      setError(message);
      toast.error(message); 
      console.error("❌ Login failed:", error.response?.data || error.message);
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
            onchange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onchange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            LOGIN
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
