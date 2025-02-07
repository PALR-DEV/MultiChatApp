import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SearchContactView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Simulated contacts data - replace with actual API call
    useEffect(() => {

    }, []);

    const handleUserSelect = async (selectedUser) => {
        try {
            const response = await fetch('http://localhost:3000/api/create-conversation', {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    otherUserId: selectedUser.id
                })
            });
            const conversation = await response.json();

            navigate('/', {
                state: {
                    selectedChat: {
                        id:conversation.data.id,
                        participant: selectedUser,
                        messages:[]
                    }
                }
            })
            
        } catch (error) {
            setError('Failed to start conversation');
        }
    }

    const fetchUsers = async (query) => {
        if (!query) {
            setUsers([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const myUserID = localStorage.getItem('userId');
            const userListResponse = await fetch(`http://localhost:3000/api/search-user?searchQuery=${query}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (!userListResponse.ok) {
                throw new Error('Failed to fetch users. Please try again.');
            }

            
            const userListData = await userListResponse.json();
            const userData = userListData.data;

            const filteredUsers = userData.filter(user => user.id !== myUserID);
            setUsers(filteredUsers);
        } catch (error) {
            setError(error.message || 'An error occurred while searching for users');
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim().length < 2) {
            setUsers([]);
            return;
        }
        
        fetchUsers(query);
    };

        // const filtered = contacts.filter(contact =>
        //     contact.name.toLowerCase().includes(query)
        // );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

            {/* Header and Navigation */}
            <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between relative z-10">
                <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Chat</span>
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-white/90">Find Contacts</h1>
            </div>

            {/* Search Container */}
            <div className="max-w-3xl mx-auto relative z-10">
                {/* Search Input */}
                <div className="relative group mb-8">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        {isLoading ? (
                            <svg className="w-5 h-5 text-white/50 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-white/50 group-hover:text-white/70 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl
                                 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10
                                 transition-all duration-300 shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-xl">
                        <p className="text-red-400 text-center">{error}</p>
                    </div>
                )}

                {/* Users List */}
                <div className="space-y-4">
                    {users.length > 0 ? (
                        users.map(user => (
                            <div
                                key={user.id}
                                onClick={() => handleUserSelect(user)}
                                className="group flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-xl
                                         border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]
                                         hover:border-white/20 cursor-pointer shadow-lg hover:shadow-xl active:scale-[0.98]"
                            >
                                <img
                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                                    alt={user.username}
                                    className="w-12 h-12 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3"
                                />
                                <div>
                                    <h3 className="text-white font-medium group-hover:text-white/90 transition-colors duration-300">
                                        {user.username}
                                    </h3>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-white/50">{isLoading ? 'Searching...' : 'No users found'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}