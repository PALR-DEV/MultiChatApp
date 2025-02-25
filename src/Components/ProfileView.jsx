import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import authService from '../Services/AuthService';


const ProfileView = () => {
    const navigate = useNavigate();
    const bannerInputRef = useRef(null);
    const avatarInputRef = useRef(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [currentAvatar, setCurrentAvatar] = useState(null);
    const [currentBanner, setCurrentBanner] = useState(null);
    const [user, setUser] = useState(null)

    async function getUserInfo() {
        try {
            const user = await authService.getUser();
            setUser(user);

        } catch (error) {
            throw error;

        }
    }

    useEffect(() => {
        async function initFunctions() {
            await getUserInfo();
        }

        initFunctions();
    }, [])

    useEffect(() => {
        if (user) {
            getProfilePicture();
            getBannerPicture();
        }
    }, [user])


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBioChange = (e) => {
        setUser(prev => ({
            ...prev,
            bio: e.target.value
        }));
    };

    const updateProfilePic = async () => {
        try {
            const blob = await fetch(avatarPreview).then(r => r.blob());
            const { data, error } = await supabase.storage
                .from('profile_pics')
                .update(`avatar_${user.id}`, blob, {  // Flat structure
                    cacheControl: '3600',
                    upsert: true,
                    contentType: blob.type
                });

            if (error) throw error;
            return data;
        } catch (error) {
            throw error
        }
    }

    const updateBannerPic = async () => {
        try {
            const blob = await fetch(bannerPreview).then(r => r.blob());

            const { data, error } = await supabase.storage
                .from('banner_pics')
                .update(`banner_${user.id}`, blob, {
                    cacheControl: '3600',
                    upsert: true,
                    contentType: blob.type
                });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error updating banner picture:', error);
            throw error;
        }
    }

    const getProfilePicture = async () => {
        try {
            const { data, error } = await supabase.storage
                .from('profile_pics')
                .download(`avatar_${user.id}`);

            if (error) throw error;

            if (data) {
                const avatarURL = window.URL.createObjectURL(data);
                setCurrentAvatar(avatarURL);
                setAvatarPreview(null); // Reset preview when loading current image
            }
        } catch (error) {
            throw error;
        }
    }


    const getBannerPicture = async () => {
        try {
            const { data, error } = await supabase.storage
                .from('banner_pics')
                .download(`banner_${user.id}`);
            if (error) throw error;

            if (data) {
                const bannerURL = window.URL.createObjectURL(data);
                setCurrentBanner(bannerURL);
                setBannerPreview(null); // Reset preview when loading current image
            }
        } catch (error) {
            throw error;
        }
    }



    const handleSave = async () => {
        try {
            // Update profile picture if changed
            if (avatarPreview) {
                await updateProfilePic();
            }

            // Update banner picture if changed
            if (bannerPreview) {
                await updateBannerPic();
            }

            // Clear previews after successful upload
            setAvatarPreview(null);
            setBannerPreview(null);

            // Refresh user data
            await getUserInfo();

            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Error saving changes:', error);
            alert('Error saving changes. Please try again.');
        }
    };




    const handleImageUpload = (event, type) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'banner') {
                    setBannerPreview(reader.result);
                } else {
                    setAvatarPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl relative overflow-hidden">
                {/* Banner Image with Upload Overlay */}
                <div className="h-48 w-full relative group bg-gray-100 flex items-center justify-center">
                    {bannerPreview || currentBanner ? (
                        <img
                            src={bannerPreview || currentBanner}
                            alt="Profile Banner"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                        <button
                            onClick={() => bannerInputRef.current.click()}
                            className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-300 flex items-center shadow-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Change Banner
                        </button>
                        <input
                            type="file"
                            ref={bannerInputRef}
                            onChange={(e) => handleImageUpload(e, 'banner')}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                </div>
                <div className="p-8 relative">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-300 group"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600 group-hover:text-gray-900 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                    </button>

                    {/* Profile Header with Avatar Upload */}
                    <div className="flex flex-col items-center mb-12">
                        <div className="relative group">
                            <img
                                src={avatarPreview || currentAvatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNNTAgMzhjLTYuNjI3NCAwLTEyIDUuMzcyNi0xMiAxMnM1LjM3MjYgMTIgMTIgMTIgMTItNS4zNzI2IDEyLTEyLTUuMzcyNi0xMi0xMi0xMnptMCAyMGMtNC40MTgzIDAtOC0zLjU4MTctOC04czMuNTgxNy04IDgtOCA4IDMuNTgxNyA4IDgtMy41ODE3IDgtOCA4eiIgZmlsbD0iIzlDQTNBRiIvPjxwYXRoIGQ9Ik02NiA2OGMwLTguODM2Ni03LjE2MzQtMTYtMTYtMTZzLTE2IDcuMTYzNC0xNiAxNiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg=='}
                                alt="Profile"
                                className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-all duration-300 bg-gray-100"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 rounded-full">
                                <button
                                    onClick={() => avatarInputRef.current.click()}
                                    className="bg-white text-gray-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-300 flex items-center shadow-lg"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Change Photo
                                </button>
                                <input
                                    type="file"
                                    ref={avatarInputRef}
                                    onChange={(e) => handleImageUpload(e, 'avatar')}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <h1 className="mt-6 text-3xl font-bold text-gray-800 tracking-tight">{user?.userName || 'Loading...'}</h1>
                        {/* <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-50 text-green-800 mt-3">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>Online</span> */}
                    </div>

                    {/* Account Statistics */}
                    <div className="flex justify-center gap-6 mb-8">
                        <div className="flex-1 max-w-[150px] text-center group">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-300 transition-all duration-300">0</div>
                            <div className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-700">Messages</div>
                        </div>
                        <div className="flex-1 max-w-[150px] text-center group">
                            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-300 transition-all duration-300">0</div>
                            <div className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-700">Friends</div>
                        </div>
                        <div className="flex-1 max-w-[150px] text-center group">
                            <div className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-all duration-300">0</div>
                            <div className="text-sm font-medium text-gray-500 mt-1 group-hover:text-gray-700">Joined</div>
                        </div>
                    </div>

                    {/* Activity Status */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            <span className="text-sm text-gray-600">Last active {user?.lastActive || 'Online'}</span>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Personal Information
                            </h2>
                            <div className="space-y-6">
                                <div className="group">
                                    <label className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Username</label>

                                    <input
                                        type="text"
                                        name="username"
                                        value={user?.userName || 'Loading...'}
                                        onChange={handleInputChange}
                                        className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 hover:bg-white"
                                    />
                                </div>
                                <div className="group">
                                    <label className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user?.email || 'Loading...'}
                                        readOnly
                                        className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div className="group">
                                    <label className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">Bio</label>
                                    <textarea
                                        value={user?.bio || ''}
                                        onChange={handleBioChange}
                                        rows="4"
                                        className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-white/50 hover:bg-white resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Preferences
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between group p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                    <div>
                                        <span className="text-gray-700 font-medium">Dark Mode</span>
                                        <p className="text-sm text-gray-500 mt-0.5">Enable dark theme</p>
                                    </div>
                                    <button className="w-14 h-7 rounded-full bg-gray-300 relative transition-colors duration-300 ease-in-out group-hover:bg-gray-400">
                                        <span className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out"></span>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between group p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                    <div>
                                        <span className="text-gray-700 font-medium">Notifications</span>
                                        <p className="text-sm text-gray-500 mt-0.5">Get message alerts</p>
                                    </div>
                                    <button className="w-14 h-7 rounded-full bg-blue-500 relative transition-colors duration-300 ease-in-out group-hover:bg-blue-600">
                                        <span className="absolute right-1 top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out"></span>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between group p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                    <div>
                                        <span className="text-gray-700 font-medium">Sound Effects</span>
                                        <p className="text-sm text-gray-500 mt-0.5">Play notification sounds</p>
                                    </div>
                                    <button className="w-14 h-7 rounded-full bg-blue-500 relative transition-colors duration-300 ease-in-out group-hover:bg-blue-600">
                                        <span className="absolute right-1 top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Connected Accounts */}

                    {/* Actions */}
                    <div className="mt-12 flex justify-end space-x-4">
                        <button className="px-6 py-2.5 rounded-lg bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-sm">
                            Cancel
                        </button>
                        <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;