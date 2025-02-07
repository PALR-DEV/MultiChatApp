import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../Services/AuthService';

export default function SignupView() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        language: 'en'
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        // First Name validation
        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }

        // Last Name validation
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        // Username validation
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // // Language validation
        // if (!formData.language) {
        //     newErrors.language = 'Please select a language';
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                const payload = {
                    firstname: formData.firstName,
                    lastname: formData.lastName,
                    username: formData.username,
                    email: formData.email,
                    passwordhash: formData.password,
                    userlanguage: 'en'
                }
                const response = await authService.registerUser(payload);
                if (response.success) {
                    // Show success message and redirect to login
                    alert('Account created successfully! Please login.');
                    window.location.href = '/login';
                } else {
                    // Show specific error message from the API
                    setErrors({
                        submit: response.message || 'Failed to create account. Please try again.'
                    });
                }
            } catch (error) {
                console.error('Signup error:', error);
                setErrors({
                    submit: 'An unexpected error occurred. Please try again.'
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Signup Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-black relative overflow-hidden px-4 py-8 md:p-0">
                {/* Background decorative circles - adjusted for mobile */}
                <div className="absolute top-1/4 -left-16 w-48 h-48 md:w-64 md:h-64 md:-left-20 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-16 w-56 h-56 md:w-72 md:h-72 md:-right-20 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-3/4 left-1/4 w-36 h-36 md:w-48 md:h-48 md:left-1/3 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

                <div className="p-6 md:p-10 w-full max-w-[90%] md:max-w-md bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl z-10 relative border border-gray-800">
                    {/* Decorative elements - adjusted for mobile */}
                    <div className="absolute -top-8 -left-8 md:-top-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 bg-gray-800/50 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-20 h-20 md:w-28 md:h-28 bg-gray-800/50 rounded-full blur-2xl"></div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white/90 mb-6 md:mb-8 tracking-tight">
                        Create Account
                        <span className="block text-sm font-normal text-white/60 mt-2">Sign up to get started</span>
                    </h2>
                    
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/10 border ${errors.firstName ? 'border-red-500' : 'border-white/20'} rounded-xl focus:outline-none focus:border-white/40 text-white placeholder-white/50 transition-all duration-300`}
                                />
                                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                                <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>

                            <div className="relative group">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/10 border ${errors.lastName ? 'border-red-500' : 'border-white/20'} rounded-xl focus:outline-none focus:border-white/40 text-white placeholder-white/50 transition-all duration-300`}
                                />
                                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                                <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/10 border ${errors.username ? 'border-red-500' : 'border-white/20'} rounded-xl focus:outline-none focus:border-white/40 text-white placeholder-white/50 transition-all duration-300`}
                            />
                            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/10 border ${errors.email ? 'border-red-500' : 'border-white/20'} rounded-xl focus:outline-none focus:border-white/40 text-white placeholder-white/50 transition-all duration-300`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/10 border ${errors.password ? 'border-red-500' : 'border-white/20'} rounded-xl focus:outline-none focus:border-white/40 text-white placeholder-white/50 transition-all duration-300`}
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>

                            <div className="relative group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/10 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'} rounded-xl focus:outline-none focus:border-white/40 text-white placeholder-white/50 transition-all duration-300`}
                                />
                                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                                <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </div>
                        </div>

                        {/* <div className="relative group">
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleInputChange}
                                className={`w-full px-4 md:px-5 py-3 md:py-4 bg-white/10 border ${errors.language ? 'border-red-500' : 'border-white/20'} rounded-xl focus:outline-none focus:border-white/40 text-white transition-all duration-300 appearance-none`}
                            >
                                <option value="en" className="bg-gray-900">English</option>
                                <option value="es" className="bg-gray-900">Spanish</option>
                                <option value="fr" className="bg-gray-900">French</option>
                                <option value="de" className="bg-gray-900">German</option>
                            </select>
                            {errors.language && <p className="mt-1 text-sm text-red-500">{errors.language}</p>}
                            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div> */}
                        
                        {errors.submit && <p className="text-sm text-red-500 text-center">{errors.submit}</p>}
                        
                        <button
                            type="submit"
                            className="w-full py-3 md:py-4 px-6 bg-white/10 text-white rounded-xl hover:bg-white/20 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-base md:text-lg shadow-lg hover:shadow-xl border border-white/20 hover:border-white/40"
                        >
                            Create Account
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-white/60 mb-4">Already have an account?</p>
                        <Link to="/login" className="w-full inline-block py-3 md:py-4 px-6 bg-white/5 text-white/90 rounded-xl hover:bg-white/10 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-base md:text-lg shadow-md hover:shadow-lg border border-white/10 hover:border-white/20">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Full Image */}
            <div
                className="hidden md:flex md:w-1/2 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(https://wearecollins.imgix.net/uploads/RH_COLLINS_Web_18-732799.jpg?auto=format%2Ccompress&dpr=2&fit=max&h=1100&q=90)` }}
            ></div>
        </div>
    );
}