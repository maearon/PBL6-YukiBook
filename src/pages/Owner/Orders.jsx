import React from "react";
import OwnerSidebar from "../../components/OwnerSidebar";

const fakeShopOrders = [
  {
    id: "SO123456",
    date: "2025-04-20",
    customer: "Nguyễn Văn An",
    status: "Đã giao",
    total: 150000,
    items: 2,
  },
  {
    id: "SO123457",
    date: "2025-04-18",
    customer: "Nguyễn Văn An",
    status: "Đã giao",
    total: 90000,
    items: 1,
  },
];

export default function ShopOrders() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar bên trái */}
      <OwnerSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Đơn hàng cửa hàng</h1>

        {fakeShopOrders.length === 0 ? (
          <p className="text-center text-gray-600">Chưa có đơn hàng nào.</p>
        ) : (
          <div className="space-y-6">
            {fakeShopOrders.map((order) => (
              <div key={order.id} className="rounded-lg bg-white p-6 shadow hover:shadow-md transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Khách hàng</p>
                    <p className="font-medium">{order.customer}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Ngày đặt</p>
                    <p className="font-medium">{order.date}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    <p className={`font-semibold ${
                      order.status === "Đã giao" ? "text-green-500" : "text-yellow-500"
                    }`}>
                      {order.status}
                    </p>
                  </div>

                  <div className="space-y-1 text-right">
                    <p className="text-sm text-gray-500">Tổng tiền</p>
                    <p className="font-bold text-primary">{order.total.toLocaleString()}₫</p>
                    <p className="text-xs text-gray-400">{order.items} sản phẩm</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
