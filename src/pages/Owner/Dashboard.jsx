import React from "react";
import OwnerSidebar from "../../components/OwnerSidebar";

// ⚡ Fake dữ liệu thống kê
const stats = [
  { label: "Tổng đơn hàng", value: 2, icon: "📦" },
  { label: "Sản phẩm", value: 10, icon: "📚" },
  { label: "Doanh thu tháng này", value: 240000, icon: "💰" },
];

export default function OwnerDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar bên trái */}
      <OwnerSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Thống kê cửa hàng</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <p className="font-bold text-lg text-primary">
                    {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                    {item.label.includes("Doanh thu") && "₫"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
