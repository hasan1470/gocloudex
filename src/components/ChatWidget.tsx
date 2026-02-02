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

interface AuthData {
  name: string;
  email: string;
  password?: string;
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
  const [authData, setAuthData] = useState<AuthData>({
    name: '',
    email: '',
    password: ''
  });
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Check if user is at the bottom of messages
  const checkIfAtBottom = useCallback(() => {
    if (!messagesContainerRef.current) return true;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    return distanceFromBottom <= 100;
  }, []);

  // Smart scroll function
  const smartScrollToBottom = useCallback(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAtBottom]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    setIsAtBottom(checkIfAtBottom());
  }, [checkIfAtBottom]);

  // Real-time polling for new messages
  const startPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    pollingRef.current = setInterval(async () => {
      if (document.visibilityState !== 'visible' || !isOpen) return;

      if (isAuthenticated && userInfo?.email) {
        await loadChatHistory(true);
      }
    }, 4000);
  }, [isAuthenticated, userInfo?.email, isOpen]);

  // Stop polling
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  // Start/stop polling
  useEffect(() => {
    if (isAuthenticated && isOpen && userInfo) {
      startPolling();
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    }
  }, [isAuthenticated, isOpen, userInfo, startPolling]);

  // Check if user has valid token on component mount
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('userToken');

      if (token) {
        try {
          // Verify token is still valid and get user info
          const response = await fetch(`/api/chat/auth?token=${token}`);
          const result = await response.json();

          if (result.success) {
            setUserInfo(result.data.user);
            setIsAuthenticated(true);
            loadChatHistory();
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('userToken');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          localStorage.removeItem('userToken');
        }
      }
    };

    checkTokenValidity();
  }, []);

  // Load chat history
  const loadChatHistory = async (silent = false): Promise<boolean> => {
    const token = localStorage.getItem('userToken');
    if (!token || !userInfo?.email) return false;

    try {
      const response = await fetch(`/api/chat?email=${encodeURIComponent(userInfo.email)}&t=${Date.now()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success) {
        const messagesWithIds = (result.data.messages || []).map((msg: any) => ({
          ...msg,
          id: msg.id || msg._id || `msg-${Date.now()}`
        }));

        setMessages(prev => {
          if (JSON.stringify(prev) !== JSON.stringify(messagesWithIds)) {
            return messagesWithIds;
          }
          return prev;
        });

        return true;
      } else {
        if (!silent && response.status === 401) {
          handleLogout();
          toast.error('Session expired. Please login again.');
        }
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
          name: authData.name,
          email: authData.email,
          password: authMode === 'login' ? authData.password : undefined,
          mode: authMode
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (result.data.message === 'existing_user_please_login') {
          // Existing user - show success message and switch to login mode
          toast.success(`You're already our valued customer! We sent your password to your email. Please login with your password.`);
          setAuthMode('login');
          // Clear the password field for security
          setAuthData(prev => ({ ...prev, password: '' }));
          setLoading(false);
          return;
        }

        // Successful authentication
        setUserInfo(result.data.user);
        setIsAuthenticated(true);
        setIsNewUser(result.data.isNewUser);

        // Store ONLY the token in localStorage (no user data)
        localStorage.setItem('userToken', result.data.token);

        // Load chat history
        await loadChatHistory();

        if (result.data.isNewUser) {
          toast.success(`Welcome! Your password: ${result.data.password} - Save it for future access.`);
        } else {
          toast.success('Welcome back!');
        }

        if (onNewMessage) {
          onNewMessage(authData.email);
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
    const token = localStorage.getItem('userToken');
    if (!newMessage.trim() || loading || !token) return;

    const messageToSend = newMessage.trim();
    setNewMessage('');
    setLoading(true);

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const tempMessage: ChatMessage = {
      id: tempId,
      message: messageToSend,
      sender: 'user',
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, tempMessage]);
    setTimeout(smartScrollToBottom, 100);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: messageToSend,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      await loadChatHistory();

      if (onNewMessage) {
        onNewMessage(userInfo?.email || '');
      }
    } catch (error) {
      toast.error('Failed to send message');
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Only remove token
    setIsAuthenticated(false);
    setIsNewUser(false);
    setAuthMode('register');
    setMessages([]);
    setAuthData({ name: '', email: '', password: '' });
    setUserInfo(null);
    setShowPassword(false);
    setIsAtBottom(true);

    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
    setAuthData(prev => ({ ...prev, password: '' })); // Clear password when switching modes
    setShowPassword(false);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsAtBottom(true);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-end pb-6 pr-3 pl-3 md:pb-5 md:pr-5">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Container */}
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

            {/* Chat Content */}
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
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors text-style ${authMode === 'register'
                        ? 'bg-primary text-white'
                        : 'text-textLight hover:text-headingLight'
                        }`}
                    >
                      <UserPlus className="h-4 w-4 inline mr-2" />
                      New User
                    </button>
                    <button
                      onClick={() => setAuthMode('login')}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors text-style ${authMode === 'login'
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
                          value={authData.name}
                          onChange={(e) => setAuthData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
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
                        value={authData.email}
                        onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
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
                            value={authData.password || ''}
                            onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring pr-10 text-style"
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
                // Chat Interface
                <>
                  {/* User Info Bar */}
                  <div className="flex-shrink-0 p-3 border-b border-border bg-input flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {userInfo ? getInitials(userInfo.name) : 'U'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-headingLight text-style">
                          {userInfo?.name || 'User'}
                        </div>
                        <div className="text-xs text-textLight text-style">
                          {userInfo?.email || ''}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-textLight hover:text-headingLight transition-colors text-style"
                    >
                      Logout
                    </button>
                  </div>

                  {/* Messages Area */}
                  <div
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-4 min-h-0"
                  >
                    {isNewUser && (
                      <div className="bg-greenType/10 border border-greenType/20 rounded-lg p-3 mb-4">
                        <div className="flex items-center space-x-2 text-greenType text-sm">
                          <Key className="h-4 w-4" />
                          <span className="font-medium text-style">Account Created Successfully!</span>
                        </div>
                        <p className="text-greenType text-xs mt-2 text-style">
                          Check your email for your password. Save it to access your chat history later.
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
                        {(() => {
                          const groups: { [key: string]: ChatMessage[] } = {};
                          messages.forEach(msg => {
                            const date = new Date(msg.createdAt).toDateString();
                            if (!groups[date]) groups[date] = [];
                            groups[date].push(msg);
                          });

                          return Object.entries(groups).map(([date, groupMessages]) => {
                            const today = new Date().toDateString();
                            const yesterday = new Date();
                            yesterday.setDate(yesterday.getDate() - 1);
                            const yesterdayDate = yesterday.toDateString();

                            let dateLabel = new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric' });
                            if (date === today) dateLabel = 'Today';
                            else if (date === yesterdayDate) dateLabel = 'Yesterday';

                            return (
                              <div key={date} className="space-y-3">
                                <div className="flex justify-center my-4">
                                  <span className="text-[10px] font-semibold text-textLight uppercase tracking-wider bg-input px-2 py-0.5 rounded-full border border-border/50">
                                    {dateLabel}
                                  </span>
                                </div>
                                {groupMessages.map((message, index) => (
                                  <div
                                    key={getMessageKey(message, index)}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                  >
                                    <div
                                      className={`max-w-[80%] shadow-sm rounded-2xl px-4 py-2 ${message.sender === 'user'
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-bgLight border border-border text-headingLight rounded-bl-none'
                                        }`}
                                    >
                                      <p className="text-sm text-style break-words">{message.message}</p>
                                      <p className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-primary-light' : 'text-textLight'
                                        } text-style`}>
                                        {new Date(message.createdAt).toLocaleTimeString([], {
                                          hour: '2-digit',
                                          minute: '2-digit'
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            );
                          });
                        })()}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Scroll to bottom button */}
                  {!isAtBottom && messages.length > 3 && (
                    <div className="flex justify-center p-2 bg-bgLight border-t border-border">
                      <button
                        onClick={scrollToBottom}
                        className="px-3 py-1 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-xs flex items-center space-x-1"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>New messages</span>
                      </button>
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="flex-shrink-0 p-4 border-t border-border">
                    <form onSubmit={sendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-style"
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