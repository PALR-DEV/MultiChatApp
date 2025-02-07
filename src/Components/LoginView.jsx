

import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../Services/AuthService';

export default function LoginView() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        
        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        // } else if (formData.password.length < 6) {
        //     newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                await authService.login(formData.email, formData.password).then((response) => {
                    if(response.success === true){
                        localStorage.setItem('userId', response.data.user.id)
                        localStorage.setItem('token', response.data.token);
                        
                        window.location.reload();
                    } else {
                        setErrors({
                            submit: 'Password or Email is Invalid'
                        });
                    }
                })


            } catch (error) {
                console.error('Login error:', error);
                setErrors({
                    submit: 'Failed to login. Please try again.'
                });
            }
        }
    };
    return (
        <div className="min-h-screen flex">
            {/* Left Side - Full Image */}
            <div
                className="hidden md:flex md:w-1/2 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(https://cdn.dribbble.com/userupload/14119663/file/original-d1a07c43c3dbb4a9ff99ba88c1a8c798.jpeg?resize=1504x846&vertical=center)` }}
            ></div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-black relative overflow-hidden px-4 py-8 md:p-0">
                {/* Background decorative circles - adjusted for mobile */}
                <div className="absolute top-1/4 -left-16 w-48 h-48 md:w-64 md:h-64 md:-left-20 bg-purple-500/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-16 w-56 h-56 md:w-72 md:h-72 md:-right-20 bg-blue-500/30 rounded-full blur-3xl"></div>
                <div className="absolute top-3/4 left-1/4 w-36 h-36 md:w-48 md:h-48 md:left-1/3 bg-pink-500/30 rounded-full blur-3xl"></div>

                <div className="p-6 md:p-10 w-full max-w-[90%] md:max-w-md bg-white rounded-2xl shadow-2xl z-10 relative">
                    {/* Decorative elements - adjusted for mobile */}
                    <div className="absolute -top-8 -left-8 md:-top-10 md:-left-10 w-24 h-24 md:w-32 md:h-32 bg-gray-100/80 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 w-20 h-20 md:w-28 md:h-28 bg-gray-200/80 rounded-full blur-2xl"></div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8 tracking-tight">
                        Welcome Back
                        <span className="block text-sm font-normal text-gray-500 mt-2">Sign in to continue</span>
                    </h2>
                    
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 md:px-5 py-3 md:py-4 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-gray-400 text-gray-800 placeholder-gray-400 transition-all duration-300`}
                            />
                            <div className="absolute inset-0 rounded-xl bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                        
                        <div className="relative group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 md:px-5 py-3 md:py-4 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:border-gray-400 text-gray-800 placeholder-gray-400 transition-all duration-300`}
                            />
                            <div className="absolute inset-0 rounded-xl bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                        </div>
                        
                        {errors.submit && <p className="text-sm text-red-500 text-center">{errors.submit}</p>}
                        
                        <button
                            type="submit"
                            className="w-full py-3 md:py-4 px-6 bg-black text-white rounded-xl hover:bg-gray-800 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-base md:text-lg shadow-lg hover:shadow-xl"
                        >
                            Sign In
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-gray-500 mb-4">Don't have an account?</p>
                        <Link to="/signup" className="w-full inline-block py-3 md:py-4 px-6 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 focus:outline-none transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-base md:text-lg shadow-md hover:shadow-lg">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}