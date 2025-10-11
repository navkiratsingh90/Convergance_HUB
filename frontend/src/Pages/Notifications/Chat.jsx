import { ArrowRight, Clipboard, Link } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const darkMode = useSelector((state) => state.Theme.darkMode);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState(1);
  const messagesEndRef = useRef(null);

  // Mock data for chats
  const chats = [
    {
      id: 1,
      name: "AI Development Team",
      members: 24,
      online: 12,
      lastSeen: "2 min ago",
      unread: 3,
      avatar: "🤖",
      status: "online"
    },
    {
      id: 2,
      name: "React Experts",
      members: 15,
      online: 8,
      lastSeen: "1 hour ago",
      unread: 0,
      avatar: "⚛️",
      status: "online"
    },
    {
      id: 3,
      name: "Backend Architecture",
      members: 18,
      online: 5,
      lastSeen: "5 min ago",
      unread: 1,
      avatar: "🔧",
      status: "online"
    },
    {
      id: 4,
      name: "Sarah Kim",
      members: 2,
      online: 1,
      lastSeen: "Online",
      unread: 0,
      avatar: "👩‍💻",
      status: "online"
    },
    {
      id: 5,
      name: "Alex Chen",
      members: 2,
      online: 0,
      lastSeen: "2 hours ago",
      unread: 0,
      avatar: "👨‍💼",
      status: "offline"
    }
  ];

  // Mock initial messages
  const initialMessages = [
    { id: 1, text: "Hey team! How's the AI model training going?", sender: "Alex Chen", time: "10:30 AM", isMe: false },
    { id: 2, text: "Going great! We've achieved 95% accuracy on the test dataset.", sender: "You", time: "10:32 AM", isMe: true },
    { id: 3, text: "That's awesome! 🎉 When can we integrate it with the frontend?", sender: "Sarah Kim", time: "10:33 AM", isMe: false },
    { id: 4, text: "We should be ready by Friday. I'll create the API endpoints today.", sender: "Mike Rodriguez", time: "10:35 AM", isMe: false },
    { id: 5, text: "Perfect! I'll update the React components to consume the new API.", sender: "You", time: "10:36 AM", isMe: true },
    { id: 6, text: "Don't forget about error handling for the API calls.", sender: "Alex Chen", time: "10:37 AM", isMe: false },
    { id: 7, text: "Already on it. I'm implementing proper error boundaries and loading states.", sender: "You", time: "10:38 AM", isMe: true }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const getActiveChat = () => {
    return chats.find(chat => chat.id === activeChat);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Header */}
      

      <div className="container mx-auto h-[calc(100vh-80px)] flex">
        {/* Sidebar - Chat List */}
        

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {getActiveChat()?.avatar}
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{getActiveChat()?.name}</h2>
                  <p className={`text-sm ${
                    darkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {getActiveChat()?.status === 'online' ? 'Online' : `Last seen ${getActiveChat()?.lastSeen}`}
                  </p>
                </div>
              </div>
              
              
            </div>
          </div>

          {/* Messages Area */}
          <div className={`flex justify-between overflow-y-auto p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="w-full mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
                    message.isMe
                      ? darkMode
                        ? 'bg-blue-600 rounded-br-none'
                        : 'bg-blue-500 text-white rounded-br-none'
                      : darkMode
                        ? 'bg-gray-800 rounded-bl-none'
                        : 'bg-white rounded-bl-none shadow-sm'
                  }`}>
                    {!message.isMe && (
                      <div className="font-semibold text-sm mb-1 opacity-80">
                        {message.sender}
                      </div>
                    )}
                    <div className="text-sm">{message.text}</div>
                    <div className={`text-xs mt-2 text-right ${
                      message.isMe
                        ? 'text-blue-100'
                        : darkMode
                          ? 'text-gray-400'
                          : 'text-gray-500'
                    }`}>
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-4">
                <div className="flex space-x-2">
                  <button type="button" className={`p-2 rounded-lg ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}>
										<Link/>
                  </button>
                  
                </div>
                
                <div className="flex-1 relative">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows="1"
                    className={`w-full px-4 py-3 pr-12 rounded-2xl border resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className={`p-3 rounded-full transition-colors ${
                    !newMessage.trim()
                      ? 'bg-gray-400 cursor-not-allowed'
                      : darkMode
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <span className="text-lg"><ArrowRight/></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;