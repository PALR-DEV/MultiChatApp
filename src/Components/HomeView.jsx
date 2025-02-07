import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import authService from '../Services/AuthService';
import MessageArea from './MessageArea';

export default function HomeView() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [timestamp, setTimestamp] = useState(Date.now());
    const [conversations, setConversations] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.selectedChat) {
            setSelectedChat(location.state.selectedChat);
        }
    }, [location]);
    
    useEffect(() => {
        const initializeData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/get-user-conversations', {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const responseData = await response.json();
                const conversationData = responseData.data;
                
                //send the data to a function to get all participants
                getParticipants(conversationData);

                // setConversations(conversationData);
                
                const user = await authService.getUserInfo();
                setUser(user.data);
            } catch (error) {
                console.error('Error initializing data:', error);
            }
        };

        initializeData();
    }, []);

    const getParticipants = async (conversationData) => {
        try {
            // Map through each conversation to get participants
            const participantPromises = conversationData.map(async (conversation) => {
                const response = await fetch(`http://localhost:3000/api/get-conversation-participants/${conversation.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                return {
                    ...conversation,
                    participants: data.data
                };
            });

            // Wait for all participant requests to complete
            const conversationsWithParticipants = await Promise.all(participantPromises);
            setConversations(conversationsWithParticipants);
            
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    }

    const handleChatSelect = (conversation) => {
        const otherParticipant = conversation.participants?.find(
            participant => participant.id !== user?.id
        );
        setSelectedChat({
            ...conversation,
            participant: otherParticipant,
            currentUser: user
        });
    };
    const handleLogout = () => {
        setIsAuthenticated(false)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
    }

    return (
        <div className="min-h-screen bg-black text-gray-100 flex relative overflow-hidden">
            {/* Decorative background elements */}
            <div className={`absolute transition-all duration-300 rounded-full blur-3xl ${isSidebarOpen ? 'top-0 -left-4 w-72 h-72' : 'top-0 left-0 w-48 h-48'} bg-purple-500/30`}></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className={`absolute transition-all duration-300 rounded-full blur-3xl ${isSidebarOpen ? 'top-1/2 left-1/2 w-48 h-48' : 'top-1/3 left-1/4 w-64 h-64'} bg-pink-500/20`}></div>

            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-72' : 'w-16'} h-screen bg-gray-900/60 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 ease-in-out flex-shrink-0`}>
                <div className="h-full flex flex-col">
                    <div className="p-4">
                        <div className="flex items-center justify-between">
                            <h1 className={`${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'} font-bold text-xl transition-all duration-300 overflow-hidden whitespace-nowrap`}>Chats</h1>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className={`p-2 hover:bg-gray-800/80 rounded-lg transition-all duration-300 ${!isSidebarOpen && 'rotate-180'}`}
                                aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                            >
                                <svg className="w-5 h-5" 
                                     fill="none" 
                                     stroke="currentColor" 
                                     viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto px-4 space-y-2">
                        {conversations.length > 0 ? (
                            conversations.map((conversation) => {
                                const otherParticipant = conversation.participants?.find(
                                    participant => participant.id !== user?.id
                                );
                                
                                return (
                                    <div
                                        key={conversation.id}
                                        onClick={() => handleChatSelect(conversation)}
                                        className={`flex items-center ${isSidebarOpen ? 'gap-3 p-3' : 'justify-center p-2'} rounded-xl cursor-pointer ${selectedChat?.id === conversation.id ? 'bg-gray-800' : 'hover:bg-gray-800/50'} transition-all duration-300`}
                                    >
                                        <div className={`rounded-full border-2 border-gray-700 overflow-hidden flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-10 h-10' : 'w-8 h-8'}`}>
                                            <img
                                                src={`https://api.dicebear.com/7.x/initials/svg?seed=${otherParticipant?.username || 'default'}`}
                                                alt={otherParticipant?.username}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {isSidebarOpen && (
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-gray-100 truncate">
                                                    {otherParticipant?.username || 'Unknown User'}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate">
                                                    Click to start chatting
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className={`bg-gray-800 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${isSidebarOpen ? 'w-16 h-16' : 'w-8 h-8'}`}>
                                    <svg className={`text-gray-400 transition-all duration-300 ${isSidebarOpen ? 'w-8 h-8' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                {isSidebarOpen && (
                                    <div>
                                        <p className="text-gray-400 text-sm">No conversations yet</p>
                                        <Link 
                                            to='/search-contact'
                                            className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm inline-block"
                                        >
                                            Add New Contact
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Profile Section */}
                    <div className="p-4 border-t border-gray-800 bg-gray-900/60">
                        <Link 
                            to='/my-profile' 
                            className={`flex items-center ${isSidebarOpen ? 'gap-3 p-3' : 'justify-center p-2'} hover:bg-gray-800/50 rounded-xl transition-all duration-300 group relative`}
                        >
                            <div className={`overflow-hidden rounded-full border-2 border-gray-700 group-hover:border-gray-600 transition-all duration-300 ${isSidebarOpen ? 'w-10 h-10' : 'w-12 h-12'}`}>
                                <img
                                    src={user?.profile_picture ? `http://localhost:3000/api/profile-picture?token=${localStorage.getItem('token')}&t=${timestamp}` : `https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || 'default'}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
                                    alt="Profile"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            {isSidebarOpen ? (
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-100 truncate group-hover:text-white transition-colors duration-200">{user?.username || 'Loading...'}</p>
                                    <p className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-200">{user?.email || 'Loading...'}</p>
                                    <div className="mt-1 flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">Online</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
                                    <p className="text-sm text-white">{user?.username || 'Loading...'}</p>
                                    <p className="text-xs text-gray-400">{user?.email || 'Loading...'}</p>
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden z-10 relative">
                {/* Chat Header */}
                <div className="flex-shrink-0 h-16 border-b border-gray-800 flex items-center px-6 bg-gray-900/60 backdrop-blur-xl">
                    {selectedChat ? (
                        <>
                            <div className="w-10 h-10 rounded-full border-2 border-gray-700 overflow-hidden">
                                <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedChat.participant?.username || 'default'}`}
                                    alt={selectedChat.participant?.username}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="ml-4">
                                <p className="font-medium text-gray-100">{selectedChat.participant?.username}</p>
                                <p className="text-xs text-gray-400">Online</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-10 h-10 bg-gray-800/50 rounded-full animate-pulse"></div>
                            <div className="ml-4">
                                <p className="font-medium text-gray-400">No chat selected</p>
                                <p className="text-xs text-gray-500">Select a contact to start chatting</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-hidden relative">
                    <MessageArea selectedChat={selectedChat} />
                </div>

            </div>
        </div>
    );
}