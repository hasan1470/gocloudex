'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  Info, 
  User, 
  Check, 
  CheckCheck,
  Mail,
  MessageCircle,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ChatUser {
  id: string;
  name: string;
  email: string;
  lastChatDate: string;
  lastChatMessage: string;
  chatUnreadCount: number;
  chatCount: number;
  isOnline?: boolean;
  lastSeen?: string;
}

interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'admin';
  isRead: boolean;
  createdAt: string;
  type?: 'text' | 'image' | 'file';
}

export default function AdminChatsPage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUnread, setFilterUnread] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const [isAtBottom, setIsAtBottom] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);


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

  // Real-time polling for new messages
  const startPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    pollingRef.current = setInterval(async () => {
      if (selectedUser) {
        const hasNewMessages = await fetchMessages(selectedUser.id, true);
        if (hasNewMessages && isAtBottom) {
          // Only auto-scroll if there are new messages and user is at bottom
          setTimeout(smartScrollToBottom, 100);
        }
      }
      fetchChatUsers(true);
    }, 3000);
  }, [selectedUser, isAtBottom, smartScrollToBottom]);

  // Stop polling when component unmounts
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  // Fetch chat users
  const fetchChatUsers = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const response = await fetch(`/api/admin/chats?filter=chat&t=${lastUpdate}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();

      if (result.success) {
        setUsers(result.data.users);
        setLastUpdate(Date.now());
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      if (!silent) {
        console.error('Failed to fetch chat users:', error);
        toast.error('Failed to load chat users');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Fetch messages for selected user - returns true if new messages were found
  const fetchMessages = async (userId: string, silent = false): Promise<boolean> => {
    try {
      const response = await fetch(`/api/admin/chats?userId=${userId}&t=${lastUpdate}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const result = await response.json();

      if (result.success) {
        const messagesWithIds = result.data.messages.map((msg: any) => ({
          ...msg,
          id: msg.id || msg._id || `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }));
        
        // Check if there are new messages
        const currentMessageIds = new Set(messages.map(m => m.id));
        const hasNewMessages = messagesWithIds.some((msg: ChatMessage) => !currentMessageIds.has(msg.id));
        
        setMessages(messagesWithIds);
        
        // Mark messages as read when viewing (only if not silent update)
        if (!silent && messagesWithIds.some((msg: ChatMessage) => !msg.isRead && msg.sender === 'user')) {
          await markMessagesAsRead(userId);
        }
        
        return hasNewMessages;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      if (!silent) {
        console.error('Failed to fetch messages:', error);
        toast.error('Failed to load messages');
      }
      return false;
    }
  };

  // Mark messages as read
  const markMessagesAsRead = async (userId: string) => {
    try {
      await fetch('/api/admin/chats', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          action: 'mark-read'
        }),
      });
      
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, chatUnreadCount: 0 } : user
      ));
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  // Send message
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || sending) return;

    const messageToSend = newMessage.trim();
    setNewMessage('');
    setSending(true);

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const tempMessage: ChatMessage = {
      id: tempId,
      message: messageToSend,
      sender: 'admin',
      isRead: true,
      createdAt: new Date().toISOString(),
      type: 'text'
    };

    // Optimistically update messages
    setMessages(prev => [...prev, tempMessage]);
    
    // Auto-scroll to bottom when sending new message
    setTimeout(smartScrollToBottom, 100);

    try {
      const response = await fetch('/api/admin/chats', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          message: messageToSend
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      // Replace temporary message with actual one
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? result.data.message : msg
      ));

      // Update user list
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { 
              ...user, 
              lastChatMessage: messageToSend,
              lastChatDate: new Date().toISOString(),
              chatCount: user.chatCount + 1
            } 
          : user
      ));

      toast.success('Message sent');
    } catch (error) {
      toast.error('Failed to send message');
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    } finally {
      setSending(false);
    }
  };

  // Scroll to bottom manually
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setIsAtBottom(true);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchChatUsers();
  }, []);

  // Start polling when user is selected
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id);
      startPolling();
      setIsAtBottom(true); // Reset to bottom when selecting new user
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    }
  }, [selectedUser, startPolling]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterUnread || user.chatUnreadCount > 0;
    return matchesSearch && matchesFilter;
  });

  const getMessageKey = (message: ChatMessage, index: number) => {
    return message.id || `message-${index}-${message.createdAt}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleRefresh = () => {
    if (selectedUser) {
      fetchMessages(selectedUser.id);
    }
    fetchChatUsers();
    toast.success('Refreshing messages...');
  };

  return (
    <div className="flex h-screen max-h-[86vh] bg-bgLight">
      {/* Left Sidebar - Users List */}
      <div className="w-80 border-r border-border bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-headingLight">Messages</h1>
            <div className="flex space-x-2">
              <button 
                onClick={handleRefresh}
                className="p-2 hover:bg-input rounded-full transition-colors"
                title="Refresh messages"
              >
                <RefreshCw className="h-5 w-5 text-textLight" />
              </button>
              <button className="p-2 hover:bg-input rounded-full transition-colors">
                <Info className="h-5 w-5 text-textLight" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textLight" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-style"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 mt-3">
            <button
              onClick={() => setFilterUnread(false)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                !filterUnread
                  ? 'bg-primary text-white'
                  : 'text-textLight hover:text-headingLight'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterUnread(true)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                filterUnread
                  ? 'bg-primary text-white'
                  : 'text-textLight hover:text-headingLight'
              }`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-textLight mx-auto mb-3" />
              <p className="text-textLight text-style">No chat users found</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center p-4 border-b border-border cursor-pointer hover:bg-input transition-colors ${
                  selectedUser?.id === user.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                }`}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(user.name)}
                  </div>
                  {user.chatUnreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-redType rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {user.chatUnreadCount}
                    </div>
                  )}
                </div>
                
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-headingLight truncate text-style">
                      {user.name}
                    </h3>
                    <span className="text-xs text-textLight text-style">
                      {formatTime(user.lastChatDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-textLight truncate text-style">
                      {user.lastChatMessage}
                    </p>
                    {user.chatUnreadCount > 0 && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="border-b border-border bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                    {getInitials(selectedUser.name)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-headingLight text-style">
                      {selectedUser.name}
                    </h2>
                    <p className="text-sm text-textLight text-style">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={scrollToBottom}
                    className="p-2 hover:bg-input rounded-full transition-colors"
                    title="Scroll to bottom"
                  >
                    <MessageCircle className="h-5 w-5 text-textLight" />
                  </button>
                  <button 
                    onClick={handleRefresh}
                    className="p-2 hover:bg-input rounded-full transition-colors"
                    title="Refresh"
                  >
                    <RefreshCw className="h-5 w-5 text-textLight" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area with scroll tracking */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div 
                ref={messagesContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-input"
              >
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-16 w-16 text-textLight mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-headingLight mb-2 text-style">
                      No messages yet
                    </h3>
                    <p className="text-textLight text-style">
                      Start a conversation with {selectedUser.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div 
                        key={getMessageKey(message, index)}
                        className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            message.sender === 'admin'
                              ? 'bg-primary text-white rounded-br-none'
                              : 'bg-white border border-border text-headingLight rounded-bl-none'
                          }`}
                        >
                          <p className="text-style break-words">{message.message}</p>
                          <div className={`flex items-center space-x-1 mt-1 ${
                            message.sender === 'admin' ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className={`text-xs ${
                              message.sender === 'admin' ? 'text-primary-light' : 'text-textLight'
                            } text-style`}>
                              {formatTime(message.createdAt)}
                            </span>
                            {message.sender === 'admin' && (
                              message.isRead ? (
                                <CheckCheck className="h-3 w-3 text-primary-light" />
                              ) : (
                                <Check className="h-3 w-3 text-primary-light" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Scroll to bottom button - only show when not at bottom */}
              {!isAtBottom && messages.length > 5 && (
                <div className="flex justify-center p-2 bg-white border-t border-border">
                  <button
                    onClick={scrollToBottom}
                    className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors text-sm flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Scroll to latest messages</span>
                  </button>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-border bg-white p-4">
              <form onSubmit={sendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-style"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {sending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Empty State - No User Selected */
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-white to-input">
            <MessageCircle className="h-24 w-24 text-textLight mb-6" />
            <h2 className="text-2xl font-bold text-headingLight mb-2 text-style">
              Your Messages
            </h2>
            <p className="text-textLight text-lg mb-8 text-style text-center max-w-md">
              Select a conversation from the sidebar to start chatting with your customers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}