import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUpView() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
          alt="Hero Image"
          className="w-full h-full object-cover absolute inset-0 opacity-90" // Darker image with lower opacity
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Join Our Community</h1>
            <p className="text-lg drop-shadow-md">Create your account and unlock amazing features today!</p>
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
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full bg-white border border-gray-300 text-gray-700 p-4 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-3 font-semibold shadow-md"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.78h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.78c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.34-1.36-.34-2.09s.12-1.43.34-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                </svg>
                Sign Up with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
