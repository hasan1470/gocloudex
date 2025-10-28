'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, User, Mail, Key, MessageSquare, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'admin';
  createdAt: string;
}

interface ChatWidgetProps {
  onNewMessage?: (userEmail: string) => void;
}

export default function ChatWidget({ onNewMessage }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isAtBottom, setIsAtBottom] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<NodeJS.Timeout>();

  // Check if user is at the bottom of messages
  const checkIfAtBottom = useCallback(() => {
    if (!messagesContainerRef.current) return true;
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom <= 100; // 100px threshold
  }, []);

  // Smart scroll function - only scroll if user is at bottom
  const smartScrollToBottom = useCallback(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAtBottom]);

  // Handle scroll events to track if user is at bottom
  const handleScroll = useCallback(() => {
    setIsAtBottom(checkIfAtBottom());
  }, [checkIfAtBottom]);

  // Real-time polling for new messages with smart scroll
  const startPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    pollingRef.current = setInterval(async () => {
      if (isAuthenticated && userData.email) {
        const hasNewMessages = await loadChatHistory(userData.email, userData.password, true);
        if (hasNewMessages && isAtBottom) {
          // Only auto-scroll if there are new messages and user is at bottom
          setTimeout(smartScrollToBottom, 100);
        }
      }
    }, 3000); // Poll every 3 seconds
  }, [isAuthenticated, userData.email, isAtBottom, smartScrollToBottom]);

  // Stop polling when component unmounts or chat closes
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  // Start/stop polling based on authentication and chat state
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      startPolling();
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    }
  }, [isAuthenticated, isOpen, startPolling]);

  // Check if user has existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setIsAuthenticated(true);
      loadChatHistory(user.email, user.password);
    }
  }, []);

  // Load chat history - returns true if new messages were found
  const loadChatHistory = async (email: string, password: string, silent = false): Promise<boolean> => {
    try {
      const response = await fetch(`/api/chat?email=${encodeURIComponent(email)}&t=${Date.now()}`);
      const result = await response.json();
      
      if (result.success) {
        // Ensure every message has a unique ID
        const messagesWithIds = (result.data.messages || []).map((msg: any) => ({
          ...msg,
          id: msg.id || msg._id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }));
        
        // Check if there are new messages
        const currentMessageIds = new Set(messages.map(m => m.id));
        const hasNewMessages = messagesWithIds.some((msg: ChatMessage) => !currentMessageIds.has(msg.id));
        
        setMessages(messagesWithIds);
        return hasNewMessages;
      } else {
        if (!silent) throw new Error(result.error);
        return false;
      }
    } catch (error) {
      if (!silent) {
        console.error('Failed to load chat history:', error);
        toast.error('Failed to load chat history');
      }
      return false;
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/chat/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: authMode === 'login' ? userData.password : undefined,
          mode: authMode
        }),
      });

      const result = await response.json();

      if (result.success) {
        const userWithPassword = {
          name: result.data.user.name,
          email: result.data.user.email,
          password: result.data.password
        };
        
        setUserData(userWithPassword);
        setIsAuthenticated(true);
        setIsNewUser(result.data.isNewUser);
        
        // Save to localStorage
        localStorage.setItem('chatUser', JSON.stringify(userWithPassword));
        
        // Load chat history
        await loadChatHistory(userData.email, userData.password);
        
        if (result.data.isNewUser) {
          toast.success(`Welcome! Your password: ${result.data.password} - Save it for future access.`);
        } else {
          if (authMode === 'register') {
            toast.success('Welcome back! We sent your password to your email.');
          } else {
            toast.success('Welcome back!');
          }
        }
        
        if (onNewMessage) {
          onNewMessage(userData.email);
        }
      } else {
        toast.error(result.error || 'Authentication failed');
      }
    } catch (error) {
      toast.error('Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    const messageToSend = newMessage.trim();
    setNewMessage('');
    setLoading(true);

    // Create unique ID for temporary message
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const tempMessage: ChatMessage = {
      id: tempId,
      message: messageToSend,
      sender: 'user',
      createdAt: new Date().toISOString()
    };
    
    // Optimistically update messages
    setMessages(prev => [...prev, tempMessage]);
    
    // Auto-scroll to bottom when sending new message
    setTimeout(smartScrollToBottom, 100);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          message: messageToSend,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Reload messages to get proper IDs and any admin replies
      await loadChatHistory(userData.email, userData.password);
      
      if (onNewMessage) {
        onNewMessage(userData.email);
      }
    } catch (error) {
      toast.error('Failed to send message');
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chatUser');
    setIsAuthenticated(false);
    setIsNewUser(false);
    setAuthMode('register');
    setMessages([]);
    setUserData({ name: '', email: '', password: '' });
    setShowPassword(false);
    setIsAtBottom(true);
    
    // Stop polling
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
    setUserData(prev => ({ ...prev, password: '' }));
    setShowPassword(false);
  };

  // Scroll to bottom manually
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsAtBottom(true);
    }
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate unique key for each message
  const getMessageKey = (message: ChatMessage, index: number) => {
    return message.id || `message-${index}-${message.createdAt}-${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white z-50 hover:scale-110"
        title="Chat with us"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Modal - Only show when open */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end pb-6 pr-6 sm:pb-4 sm:pr-4">
          {/* Backdrop with lighter overlay */}
          <div 
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat Container - Fixed height with proper layout */}
          <div className="relative w-full max-w-sm h-[85vh] max-h-[600px] bg-bgLight rounded-2xl shadow-2xl flex flex-col z-10">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-white rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <h3 className="font-semibold text-style">Live Chat</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-dark rounded transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Content - Fixed height sections */}
            <div className="flex-1 flex flex-col min-h-0">
              {!isAuthenticated ? (
                // Authentication Form
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="text-center mb-6">
                    <MessageCircle className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-headingLight mb-2 heading-style">
                      {authMode === 'login' ? 'Welcome Back!' : 'Start Chatting'}
                    </h3>
                    <p className="text-textLight text-sm text-style">
                      {authMode === 'login' 
                        ? 'Enter your email and password to continue' 
                        : 'Enter your details to start new conversation'
                      }
                    </p>
                  </div>

                  {/* Auth Mode Toggle */}
                  <div className="flex bg-input rounded-lg p-1 mb-6">
                    <button
                      onClick={() => setAuthMode('register')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors text-style ${
                        authMode === 'register'
                          ? 'bg-primary text-white'
                          : 'text-textLight hover:text-headingLight'
                      }`}
                    >
                      <UserPlus className="h-4 w-4 inline mr-2" />
                      New User
                    </button>
                    <button
                      onClick={() => setAuthMode('login')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors text-style ${
                        authMode === 'login'
                          ? 'bg-primary text-white'
                          : 'text-textLight hover:text-headingLight'
                      }`}
                    >
                      <LogIn className="h-4 w-4 inline mr-2" />
                      Returning
                    </button>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4">
                    {authMode === 'register' && (
                      <div>
                        <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    {authMode === 'login' && (
                      <div>
                        <label className="block text-sm font-medium text-headingLight mb-2 text-style">
                          Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={userData.password}
                            onChange={(e) => setUserData(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring pr-10 text-style"
                            placeholder="Enter your password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-textLight hover:text-headingLight"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-textLight mt-1 text-style">
                          Forgot password? Use "New User" mode and we'll email it to you.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors text-style"
                    >
                      {loading ? (
                        <span>Connecting...</span>
                      ) : authMode === 'login' ? (
                        <span>Login to Chat</span>
                      ) : (
                        <span>Start Chat</span>
                      )}
                    </button>
                  </form>

                  {/* Switch Mode Hint */}
                  <div className="text-center mt-4">
                    <button
                      onClick={toggleAuthMode}
                      className="text-sm text-primary hover:text-primary-dark transition-colors text-style"
                    >
                      {authMode === 'login' 
                        ? <span><span className="text-textLight">Don't have an account?</span> Start new chat</span>
                        : <span><span className="text-textLight">Already have an account?</span> Login with password</span>
                      }
                    </button>
                  </div>
                </div>
              ) : (
                // Chat Interface - Fixed height sections
                <>
                  {/* User Info Bar */}
                  <div className="flex-shrink-0 p-3 border-b border-border bg-input flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {getInitials(userData.name)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-headingLight text-style">{userData.name}</div>
                        <div className="text-xs text-textLight text-style">{userData.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-textLight hover:text-headingLight transition-colors text-style"
                    >
                      Logout
                    </button>
                  </div>

                  {/* Messages Area with scroll tracking */}
                  <div 
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-4 min-h-0"
                  >
                    {isNewUser && (
                      <div className="bg-greenType/10 border border-greenType/20 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2 text-greenType text-sm">
                          <Key className="h-4 w-4" />
                          <span className="font-medium text-style">Your Password:</span>
                          <code className="font-mono bg-white px-2 py-1 rounded text-style">{userData.password}</code>
                        </div>
                        <p className="text-greenType text-xs mt-2 text-style">
                          Save this password to access your chat history later.
                        </p>
                      </div>
                    )}

                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 text-textLight mx-auto mb-3" />
                        <p className="text-textLight text-style">No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {messages.map((message, index) => (
                          <div
                            key={getMessageKey(message, index)}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                message.sender === 'user'
                                  ? 'bg-primary text-white rounded-br-none'
                                  : 'bg-input text-headingLight rounded-bl-none'
                              }`}
                            >
                              <p className="text-style break-words">{message.message}</p>
                              <p className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-primary-light' : 'text-textLight'
                              } text-style`}>
                                {new Date(message.createdAt).toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Scroll to bottom button - only show when not at bottom */}
                  {!isAtBottom && messages.length > 3 && (
                    <div className="flex justify-center p-2 bg-white border-t border-border">
                      <button
                        onClick={scrollToBottom}
                        className="px-3 py-1 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-xs flex items-center space-x-1"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>New messages</span>
                      </button>
                    </div>
                  )}

                  {/* Message Input - Fixed at bottom */}
                  <div className="flex-shrink-0 p-4 border-t border-border">
                    <form onSubmit={sendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
                        disabled={loading}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || loading}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}