import React, { useState, useEffect, useRef } from "react";

export default function MockChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null); // Ref để tự scroll xuống cuối

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Giả lập shop trả lời tự động
  useEffect(() => {
    if (messages.length && messages[messages.length - 1].sender === "user") {
      const timer = setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "shop", text: "Shop đã nhận tin nhắn, sẽ phản hồi ngay nhé!" }
        ]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "user", text: input.trim() }]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Tin nhắn */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pt-16">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
              msg.sender === "user"
                ? "ml-auto bg-blue-600 text-white rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div> {/* Ref để luôn kéo xuống cuối */}
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
