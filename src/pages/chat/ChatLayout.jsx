import React, { useState, useEffect, useRef } from "react";
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Image, Clock, ArrowLeft } from "lucide-react";

export default function EnhancedChatLayout() {
  const [activeChatId, setActiveChatId] = useState(1);
  const [messages, setMessages] = useState([
    { id: 1, sender: "shop", text: "Chào bạn! Cảm ơn bạn đã ghé thăm shop.", time: "10:30" },
    { id: 2, sender: "user", text: "Xin chào, tôi muốn hỏi về sản phẩm mới nhất của shop", time: "10:32" },
    { id: 3, sender: "shop", text: "Dạ vâng, hiện tại shop vừa có thêm nhiều mẫu mới. Bạn quan tâm đến loại nào ạ?", time: "10:33" },
    { id: 4, sender: "user", text: "Tôi đang tìm những sản phẩm phù hợp cho mùa hè", time: "10:35" },
    { id: 5, sender: "shop", text: "Cảm ơn bạn đã đặt hàng!", time: "10:40" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const bottomRef = useRef(null);

  // Danh sách các Shop đã chat - bổ sung thêm dữ liệu minh họa
  const chats = [
    { 
      id: 1, 
      shopName: "Shop Minh Châu", 
      avatar: "https://i.pravatar.cc/100?img=5", 
      lastMessage: "Cảm ơn bạn đã đặt hàng!", 
      time: "10:40",
      unread: 0,
      online: true
    },
    { 
      id: 2, 
      shopName: "Hiệu sách Sáng Tạo", 
      avatar: "https://i.pravatar.cc/100?img=5", 
      lastMessage: "Đơn hàng của bạn đã gửi đi!", 
      time: "Hôm qua",
      unread: 2,
      online: false
    },
    { 
      id: 3, 
      shopName: "Thời trang Phương Anh", 
      avatar: "https://i.pravatar.cc/100?img=5", 
      lastMessage: "Bạn có thể ghé showroom của chúng tôi", 
      time: "Thứ 2",
      unread: 0,
      online: true
    },
    { 
      id: 4, 
      shopName: "Nhà thuốc An Khang", 
      avatar: "https://i.pravatar.cc/100?img=5", 
      lastMessage: "Chúng tôi đã nhận được yêu cầu", 
      time: "15/04",
      unread: 1,
      online: false
    },
  ];

  // Kiểm tra kích thước màn hình để responsive
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setShowSidebar(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hiệu ứng đang gõ
  useEffect(() => {
    if (input.trim().length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [input]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { 
        id: messages.length + 1, 
        sender: "user", 
        text: input.trim(),
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInput("");
      
      // Giả lập shop trả lời sau 1.5 giây
      setTimeout(() => {
        const replyMessage = { 
          id: messages.length + 2, 
          sender: "shop", 
          text: "Cảm ơn bạn đã nhắn tin. Chúng tôi sẽ phản hồi sớm nhất có thể!",
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 1500);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const ChatHeader = () => (
    <div className="sticky top-0 z-10 bg-white border-b shadow-sm p-3 flex items-center">
      {isMobile && (
        <button className="p-1 mr-2" onClick={toggleSidebar}>
          {showSidebar ? <ArrowLeft size={20} /> : <Search size={20} />}
        </button>
      )}
      
      <div className="relative mr-3">
        <img 
          src="https://i.pravatar.cc/100?img=5" 
          alt="Shop avatar" 
          className="w-10 h-10 rounded-full object-cover" 
        />
        <span className={`absolute bottom-0 right-0 w-3 h-3 ${chats.find(c => c.id === activeChatId)?.online ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}></span>
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">
          {chats.find(c => c.id === activeChatId)?.shopName}
        </h3>
        <p className="text-xs text-gray-500">
          {chats.find(c => c.id === activeChatId)?.online ? 'Đang hoạt động' : 'Không hoạt động'}
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Phone size={18} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Video size={18} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {showSidebar && (
        <aside className="w-full md:w-80 bg-white border-r flex flex-col h-full">
          <div className="p-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold">Tin nhắn</h2>
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`p-3 cursor-pointer hover:bg-gray-50 border-b ${
                  chat.id === activeChatId ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  setActiveChatId(chat.id);
                  if (isMobile) setShowSidebar(false);
                }}
              >
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <img 
                      src={chat.avatar} 
                      alt={chat.shopName} 
                      className="w-12 h-12 rounded-full object-cover" 
                    />
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{chat.shopName}</h4>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Chat Window */}
      <main className={`flex-1 flex flex-col ${!showSidebar && isMobile ? 'w-full' : ''}`}>
        <ChatHeader />

        {/* Tin nhắn */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center my-2">
              <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
                Hôm nay
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "shop" && (
                  <div className="mr-2 flex-shrink-0">
                    <img 
                      src="https://i.pravatar.cc/100?img=5" 
                      alt="Shop avatar" 
                      className="w-8 h-8 rounded-full" 
                    />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm relative ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-blue-200" : "text-gray-500"
                    } flex items-center`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="mr-2 flex-shrink-0">
                  <img 
                    src="/api/placeholder/32/32" 
                    alt="Shop avatar" 
                    className="w-8 h-8 rounded-full" 
                  />
                </div>
                <div className="bg-white text-gray-500 px-4 py-3 rounded-2xl text-sm border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: "0.2s"}}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: "0.4s"}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={bottomRef}></div>
          </div>
        </div>

        {/* Input gửi tin nhắn */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t flex items-end gap-2">
          <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Paperclip size={20} />
          </button>
          
          <button type="button" className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Image size={20} />
          </button>
          
          <div className="flex-1 bg-gray-100 rounded-full py-1 px-4 flex items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-transparent border-0 max-h-24 focus:outline-none py-2 text-sm resize-none"
              style={{ minHeight: '24px' }}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
          </div>
          
          <button 
            type="submit" 
            className={`p-3 rounded-full ${input.trim() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}
            disabled={!input.trim()}
          >
            <Send size={20} className={input.trim() ? 'text-white' : 'text-gray-500'} />
          </button>
        </form>
      </main>
    </div>
  );
}