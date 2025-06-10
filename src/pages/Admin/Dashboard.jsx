import React from "react";
import AdminSidebar from "../../components/AdminSidebar";

const stats = [
  { label: "Tổng số người dùng", value: 5, icon: "👤" },
  { label: "Tổng số cửa hàng", value: 2, icon: "🏬" },
  { label: "Tổng số sản phẩm", value: 15, icon: "📚" },
  { label: "Tổng số đơn hàng", value: 8, icon: "🛒" },
  { label: "Doanh thu toàn hệ thống", value: 1239000, icon: "💰" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar Admin */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-primary mb-8">Tổng quan hệ thống</h1>

        {/* Thống kê dạng lưới */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow hover:shadow-md transition flex items-center gap-4"
            >
              <div className="text-4xl">{item.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{item.label}</p>
                <p className="font-bold text-lg text-primary">
                  {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                  {item.label.includes("Doanh thu") && "₫"}
                </p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
