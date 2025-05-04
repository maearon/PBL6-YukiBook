import React, { useState, useEffect, useRef } from "react";

// Giả lập dữ liệu tin nhắn
const fakeMessages = [
  { sender: "user", text: "Xin chào shop ạ!" },
  { sender: "shop", text: "Chào bạn, shop hỗ trợ bạn nhé." },
];

const userAvatar = "https://i.pravatar.cc/150?img=3";  // Avatar User
const shopAvatar = "https://i.pravatar.cc/150?img=5";  // Avatar Shop

export default function ChatWindow({ activeChatId }) {
  const [messages, setMessages] = useState(fakeMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: input.trim() }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen">

      {/* Header Chat */}
      <div className="h-16 bg-white flex items-center px-6 border-b">
        <h3 className="text-lg font-bold">Đang chat với Shop ID {activeChatId}</h3>
      </div>

      {/* Nội dung tin nhắn */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100 pt-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex items-end ${msg.sender === "user" ? "justify-end" : ""}`}>
            {msg.sender === "shop" && (
              <img src={shopAvatar} alt="Shop Avatar" className="w-8 h-8 rounded-full mr-2" />
            )}

            <div
              className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (
              <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full ml-2" />
            )}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input gửi tin nhắn */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" className="btn-primary px-5 py-2 rounded-full text-sm">
          Gửi
        </button>
      </form>

    </div>
  );
}
