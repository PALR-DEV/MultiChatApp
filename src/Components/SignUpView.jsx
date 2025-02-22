import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUpView() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName:'',
    dateOfBirth: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleGoogleSignUp = () => {
    console.log('Sign up with Google clicked');
    // Add Google OAuth logic here
  };

  return (
    <div className="flex w-full h-screen">
      {/* Hero Section (Left Side) - Darker Image with Black Overlay - Kept the Same */}
      <div className="w-[40%] relative">
        <img
          src="https://cdn.dribbble.com/userupload/8432950/file/original-0c14504bd291054d76548cb015dff89a.png?resize=2048x1536&vertical=center"
          alt="Security Illustration"
          className="w-full h-full object-cover absolute inset-0 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">End-to-End Encrypted</h1>
            <p className="text-lg drop-shadow-md mb-2">Your messages are secured with state-of-the-art encryption</p>
            <p className="text-sm drop-shadow-md text-gray-200">Private key security ensures only you can access your data</p>
          </div>
        </div>
      </div>

      {/* Form Section (Right Side) - White Background */}
      <div className="w-[60%] flex items-center justify-center p-8 bg-white">
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-6"
        >
          <h2 className="text-4xl font-bold mb-4 text-black text-center">
            Create an account
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Already have an account?{' '}
            <Link to='/login' className="text-black hover:underline">
              Log in
            </Link>
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
                required
              />
            </div>

            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Username"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
              required
            />

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
              required
              max={new Date().toISOString().split('T')[0]}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
              required
            />

            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500"
                required
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
                👁️
              </span>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-black border-gray-300 rounded focus:ring-black"
                required
              />
              <label className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="/terms" className="text-black hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Sign Up Buttons */}
            <div className="space-y-2">
              <button
                type="submit"
                className="w-full bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                Sign Up
              </button>

              {/* <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500">or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <button
                  type="button"
                  onClick={() => console.log('Sign up with X clicked')}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-sm font-medium">X (Twitter)</span>
                </button>
              </div> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
