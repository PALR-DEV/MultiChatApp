import { useState, useEffect, useRef } from 'react';

//TODO: in the future i need to encrypt the content message so its more private


export default function MessageArea({ selectedChat }) {
    const messagesEndRef = useRef(null);
    const currentUserId = localStorage.getItem('userId');
    const [messages, setMessages] = useState([]);
    const [conversationInfo, setConversationInfo] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);


    const formatTimestamp = (timeStamp) => {
        const date = new Date(timeStamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInDays === 1) return 'Yesterday';
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    };


useEffect(() => {
    let interval;
    if (selectedChat) {
        interval = setInterval(() => {
            getMessages();
        }, 2000);
    }

    // Cleanup interval on component unmount
    return () => {
        if (interval) {
            clearInterval(interval);
        }
    };
}, [selectedChat]);

useEffect(() => {
    if (selectedChat) {
        setConversationInfo({
            conversationId: selectedChat.id,
            participants: selectedChat.participants,
            otherParticipant: selectedChat.participant,
            currentUser: selectedChat.currentUser
        });
    }
}, [selectedChat]);

useEffect(() => {
    const fetchMessages = async () => {
        if (selectedChat) {
            await getMessages();
        }
    }
    fetchMessages();
}, [selectedChat]);

const getMessages = async () => {
    try {
        const messageRequest = await fetch(`http://localhost:3000/api/get-messages/${selectedChat.id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const messageData = await messageRequest.json();
        if (messageData.success) {
            setMessages(messageData.data);
        } else {
            console.error('Failed to fetch messages:', messageData.message);
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || isSending) return;
    setIsSending(true);
    try {
        const payload = {
            conversationid: selectedChat.id,
            content: newMessage,
            senderid: currentUserId,
        }
        console.log(payload)
        const sendMessageRequest = await fetch('http://localhost:3000/api/add-messages', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ payload })
        })

        const sendMessageResponse = await sendMessageRequest.json();
        if (sendMessageResponse.success) {
            setNewMessage('');
            setIsSending(false);
            await getMessages();
        } else {
            console.error('Failed to send message:', sendMessageResponse.message);
        }


    } catch (error) {
        throw error;

    }
};

const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
};

const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
};

useEffect(() => {
    scrollToBottom();
}, [messages, selectedChat]);

if (!selectedChat) {
    return (
        <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-transparent to-gray-900/20">
            <div className="flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-800/50 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 transform hover:scale-105 transition-all duration-300">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-200">Your messages will appear here</h3>
                <p className="text-gray-400 max-w-sm">Select a contact from the sidebar to start a new conversation</p>
            </div>
        </div>
    );
}

return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-transparent to-gray-900/20">
        {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center p-6">
                    <div className="w-24 h-24 bg-gray-800/50 backdrop-blur-xl rounded-full flex items-center justify-center mb-6 transform hover:scale-105 transition-all duration-300">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-200">No messages yet</h3>
                    <p className="text-gray-400 max-w-sm">Start the conversation by sending your first message to {selectedChat.participant?.username}</p>
                </div>
            </div>
        ) : (
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <div className="flex flex-col space-y-4 p-6">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.senderid === currentUserId ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] ${message.senderid === currentUserId
                                    ? 'bg-blue-500/20 backdrop-blur-xl border border-blue-500/20'
                                    : 'bg-gray-800/40 backdrop-blur-xl border border-gray-700/30'} 
                                        rounded-2xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 group`}
                            >
                                <p className="text-gray-100 mb-1">{message.content}</p>
                                <p className={`text-xs ${message.senderid === currentUserId ? 'text-blue-300/60' : 'text-gray-400/60'} group-hover:opacity-100 transition-opacity duration-300`}>
                                    {formatTimestamp(message.sentat)}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>
        )}
        <div className="flex-shrink-0 p-4 border-t border-gray-800 bg-gray-900/60 backdrop-blur-xl">
            <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-800/80 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                </button>
                <input
                    type='text'
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-gray-800/50 text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all placeholder-gray-500 backdrop-blur-sm"
                    disabled={!selectedChat || isSending}
                />
                <button
                    onClick={handleSendMessage}
                    className={`p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm ${isSending ? 'cursor-not-allowed' : ''}`}
                    disabled={!selectedChat || isSending || !newMessage.trim()}
                >
                    {isSending ? (
                        <svg className="w-6 h-6 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    </div>
);
}