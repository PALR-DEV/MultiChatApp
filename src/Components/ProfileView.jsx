import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../Services/AuthService';

export default function ProfileView() {
    const [user, setUser] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const user = await authService.getUserInfo();
            setUser(user.data);
        };
        getUser();
    }, []);

    const [timestamp, setTimestamp] = useState(Date.now());

    const getProfilePictureUrl = () => {
        return user?.profile_picture ? `http://localhost:3000/api/profile-picture?token=${localStorage.getItem('token')}&t=${timestamp}` : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || 'default'}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Reset states
        setIsUploading(true);
        setUploadError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('http://localhost:3000/api/update-profile-picture', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Refresh user data to get the updated profile picture
                const updatedUser = await authService.getUserInfo();
                setUser(updatedUser.data);
                setTimestamp(Date.now());
            } else {
                setUploadError('Failed to upload image. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadError('An error occurred while uploading the image.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setUser(null);
            const response = await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }
            
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            window.location.reload();
        } catch (error) {
            console.error('Error during logout:', error);
            // You might want to show an error message to the user here
            // For now, still clear local storage and reload as fallback
            // localStorage.removeItem('token');
            // localStorage.removeItem('userId');
            // window.location.reload();
        }
    }
    

    return (
        <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center relative overflow-hidden p-4 md:p-6">
            {/* Animated background elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

            {/* Main Content */}
            <div className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden z-10 border border-gray-800">
                {/* Header with back button */}
                <div className="p-4 md:p-6 border-b border-gray-800 flex items-center justify-between bg-gray-800/30">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm md:text-base">Back to Chat</span>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-bold text-white absolute left-1/2 -translate-x-1/2 whitespace-nowrap">My Profile</h1>
                </div>

                {/* Profile Content */}
                <div className="p-8">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-gray-600 transition-all duration-300 transform group-hover:scale-105">
                                <img
                                    src={getProfilePictureUrl()}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <label className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"  
                                    disabled={isUploading}
                                />
                                {isUploading ? (
                                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </label>
                        </div>
                        {uploadError && (
                            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
                        )}
                        <h2 className="text-2xl font-bold mt-4">{user?.username || 'Loading...'}</h2>
                        <p className="text-gray-400">{user?.email || 'Loading...'}</p>
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-6">
                        {/* Status */}
                        <div className="bg-gray-800/50 p-4 rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span>Online Status</span>
                                </div>
                                <button className="text-sm text-gray-400 hover:text-white transition-colors">Change</button>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Account Settings</h3>
                            <div className="space-y-2">
                                {/* Settings Items */}
                                <button className="w-full flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                        <span>Notifications</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <span>Privacy & Security</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Appearance</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="w-full py-3 mt-8 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}