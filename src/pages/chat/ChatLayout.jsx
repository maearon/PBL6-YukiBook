import React, { useState } from "react";
import ChatWindow from "../../components/ChatWindow";

// Danh sách các Shop đã chat
const chats = [
  { id: 1, shopName: "Shop Minh Châu", lastMessage: "Cảm ơn bạn đã đặt hàng!" },
  { id: 2, shopName: "Hiệu sách Sáng Tạo", lastMessage: "Đơn hàng của bạn đã gửi đi!" },
];

export default function ChatLayout() {
  const [activeChatId, setActiveChatId] = useState(1);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <h2 className="p-4 text-xl font-bold border-b">Tin nhắn</h2>
        <ul className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                chat.id === activeChatId ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveChatId(chat.id)}
            >
              <h4 className="font-semibold">{chat.shopName}</h4>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Chat Window */}
      <main className="flex-1 flex flex-col">
        <ChatWindow activeChatId={activeChatId} />
      </main>

    </div>
  );
}
