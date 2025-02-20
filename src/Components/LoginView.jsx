import React from "react";
import { Link } from "react-router-dom";

export default function LandingView() {
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
        <form className="w-full max-w-md space-y-8 bg-white p-6 ">
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
                className="mt-1 block w-full bg-gray-100 text-black placeholder-gray-400  rounded-md focus:border-black focus:outline-none focus:ring-1  transition-all duration-200 p-2"
                placeholder="*******"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button  type="submit" className="w-full p-3 bg-black text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">Submit </button>

          {/* Login with Google Button */}
          <button
            type="button" // Changed to 'button' since this isn't a form submission
            className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
            onClick={() => alert("Login with Google clicked!")} // Placeholder for Google auth logic
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Login with Google
          </button>


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
