import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../Services/AuthService';
import EmojiPicker from 'emoji-picker-react';
import { GiphyFetch } from '@giphy/js-fetch-api';
//api key gif jrM2T1IrekkY2LCzfUYUivlCl52e2wms

export default function HomeView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const user = await authService.getUser();
                setUser(user);
            } catch (error) {
                console.error('Error fetching user info:', error.message);
            }
        };

        getUserInfo();
    }, []);

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Add message sending logic here
            setMessage('');
        }
    };



    // Dummy data for demonstration
    const chats = [
        { id: 1, name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM', unread: 2, status: 'online', isTyping: true },
        { id: 2, name: 'Jane Smith', lastMessage: 'Meeting at 3 PM', time: '9:45 AM', unread: 0, status: 'away', isTyping: false },
        { id: 3, name: 'Team Chat', lastMessage: 'New project update', time: 'Yesterday', unread: 5, status: 'offline', isTyping: false },
    ];

    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [gifs, setGifs] = useState([]);
    const [gifSearch, setGifSearch] = useState('');
    const fileInputRef = React.useRef(null);
    
    // Initialize Giphy client
    const gf = new GiphyFetch('jrM2T1IrekkY2LCzfUYUivlCl52e2wms');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Add file sharing logic here
            console.log('File selected:', file.name);
        }
    };

    const handleTypingStatus = (e) => {
        if (e.target.value) {
            setIsTyping(true);
            // Add typing indicator logic here
            setTimeout(() => setIsTyping(false), 2000);
        }
    };

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
        setShowGifPicker(false);
    };

    const toggleGifPicker = () => {
        setShowGifPicker(!showGifPicker);
        setShowEmojiPicker(false);
    };

    const onEmojiClick = (emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const searchGifs = async (query) => {
        try {
            const { data } = await gf.search(query, { limit: 50 });
            setGifs(data);
        } catch (error) {
            console.error('Error fetching GIFs:', error);
        }
    };

    const handleGifSelect = (gif) => {
        // Here you would typically send the GIF URL in your message
        // console.log('Selected GIF:', gif.images.original.url);
        setShowGifPicker(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Icon Sidebar */}
            <div className="w-16 bg-gray-200 flex flex-col items-center py-4">
                <div className="flex-1 flex flex-col items-center space-y-8">
                    <button 
                        onClick={() => navigate('/home')}
                        className={`p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg ${location.pathname === '/home' ? 'bg-gray-300' : ''}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => navigate('/profile')}
                        className={`p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg ${location.pathname === '/profile' ? 'bg-gray-300' : ''}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-300 w-full flex justify-center">
                    <button onClick={handleLogout} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                {/* User Profile Section */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg w-full" onClick={() => navigate('/profile')}>
                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                            <div>
                                <h2 className="font-semibold text-gray-800">{user?.userName || 'Loading...'}</h2>
                                <p className="text-sm text-gray-500">Online</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Search Bar */}
                <div className="p-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search chats..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-gray-50' : ''}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                                        <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">{chat.time}</p>
                                    {chat.unread > 0 && (
                                        <span className="inline-block bg-black text-white text-xs rounded-full px-2 py-1 mt-1">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-gray-200 bg-white">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                <div>
                                    <h2 className="font-semibold text-gray-800">{selectedChat.name}</h2>
                                    <p className="text-sm text-gray-500">Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {/* Add messages here */}
                            {selectedChat.isTyping && (
                                <div className="text-sm text-gray-500 italic">
                                    {selectedChat.name} is typing...
                                </div>
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-200 bg-white">
                            <form onSubmit={handleSendMessage} className="flex space-x-4">
                                <div className="flex-1 flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                        </svg>
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={toggleEmojiPicker}
                                            className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-3.646 5.854a.5.5 0 00.708.708l2-2a.5.5 0 00-.708-.708L11 13.793l-1.646-1.647a.5.5 0 00-.708.708l2 2z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        {showEmojiPicker && (
                                            <div className="absolute bottom-full mb-2">
                                                <EmojiPicker onEmojiClick={onEmojiClick} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={toggleGifPicker}
                                            className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center font-medium"
                                        >
                                            GIF
                                        </button>
                                        {showGifPicker && (
                                            <div className="absolute bottom-full mb-2 p-4 bg-white rounded-lg shadow-lg w-72">
                                                <input
                                                    type="text"
                                                    value={gifSearch}
                                                    onChange={(e) => {
                                                        setGifSearch(e.target.value);
                                                        searchGifs(e.target.value);
                                                    }}
                                                    placeholder="Search GIFs..."
                                                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                                                />
                                                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                                                    {gifs.map((gif) => (
                                                        <img
                                                            key={gif.id}
                                                            src={gif.images.fixed_height_small.url}
                                                            alt={gif.title}
                                                            className="w-full h-20 object-cover cursor-pointer rounded"
                                                            onClick={() => handleGifSelect(gif)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => {
                                            setMessage(e.target.value);
                                            handleTypingStatus(e);
                                        }}
                                        placeholder="Type a message..."
                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <p className="text-gray-500">Select a chat to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}