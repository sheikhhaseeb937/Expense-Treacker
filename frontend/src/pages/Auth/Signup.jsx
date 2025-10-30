import React, { useState } from 'react';
import Authlayout from '../../components/laypout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Inputs';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { API_PATHS } from '../../Utilis/apiPaths.js';
import axiosInstance from '../../Utilis/axiosInstance.js';
import { toast, Toaster } from 'react-hot-toast'; 

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //handlesignup form
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullname) {
      setError("Please Enter a name");
      toast.error("Please Enter a name"); // show toast
      return;
    }
    if (!email) {
      setError("Please Enter an Email");
      toast.error("Please Enter an Email");
      return;
    }
    if (!password) {
      setError("Please Enter a Password");
      toast.error("Please Enter a Password");
      return;
    }

    setError("");

    //signup api 
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: fullname,
        email,
        password,
      });
      console.log(response);

      if (response.data) {
        toast.success("Signup successful!"); // show success toast
       setTimeout(() => {
         navigate("/login");
       }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed!"); // show API error
    }
  };

  return (
    <Authlayout>
          <Toaster />
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt4 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below, </p>

        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullname}
              onchange={({ target }) => setFullname(target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />

            <Input
              value={email}
              onchange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />

            <div className='col-span-2'>
              <Input
                value={password}
                onchange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{' '}
            <Link className='font-medium text-primary underline' to={'/login'}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </Authlayout>
  );
};

export default Signup;
