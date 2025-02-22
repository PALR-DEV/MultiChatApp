import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Services/AuthService";

export default function LandingView() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.loginWithEmail(formData.email, formData.password);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="flex w-full h-screen bg-white">
      {/* Left Side: Image Background */}
      <div className="w-[60%] relative">
        <img
          src="https://cdn.dribbble.com/userupload/8432950/file/original-0c14504bd291054d76548cb015dff89a.png?resize=2048x1536&vertical=center"
          alt="Side Image"
          className="w-full h-full object-cover absolute inset-0"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-transparent"></div> */}
      </div>



      {/* Right Side: Form */}
      <div className="w-[40%] flex items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 bg-white p-6 ">
          {/* Header Section */}
          <div className="text-center">
            {/* Logo/Icon (customized to match your image) */}
            <div className="mx-auto w-12 h-12 mb-6">
              <svg
                className="w-full h-full text-gray-900"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-6h2v2h-2v-2zm0-4h2v2h-2v-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-sm text-gray-500 mt-2">Please enter your details</p>

          </div>

          {/* Form Inputs */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-100 text-black placeholder-gray-400  rounded-md focus:border-black focus:outline-none focus:ring-1  transition-all duration-200 p-2"
                placeholder="anna@gmail.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-100 text-black placeholder-gray-400  rounded-md focus:border-black focus:outline-none focus:ring-1  transition-all duration-200 p-2"
                placeholder="*******"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full p-3 bg-black text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">Submit</button>

          {/* <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-1">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
          </div> */}

          {/* Optional: Forgot Password Link */}
          <p className="text-sm text-gray-500 text-center">
            <Link to='/signup' className="text-black hover:text-gray-500 transition-colors duration-200">
              Already have a account? Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
