import React from "react";
import AdminSidebar from "../../components/AdminSidebar";

// ⚡ Fake dữ liệu đơn hàng
const fakeOrders = [
  {
    id: "AD123456",
    customer: "Nguyễn Văn A",
    shop: "Nhà sách Minh Châu",
    total: 150000,
    status: "Đã giao",
    date: "2025-04-20",
  },
  {
    id: "AD123457",
    customer: "Trần Thị B",
    shop: "Hiệu sách Sáng Tạo",
    total: 89000,
    status: "Đang xử lý",
    date: "2025-04-19",
  },
];

export default function Orders() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar Admin */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Quản lý đơn hàng</h1>

        {/* Danh sách đơn hàng */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto rounded-lg bg-white shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Mã đơn</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Khách hàng</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Cửa hàng</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Ngày đặt</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Trạng thái</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Tổng tiền</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {fakeOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.shop}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">
                    {order.status === "Đã giao" ? (
                      <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                        {order.status}
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{order.total.toLocaleString()}₫</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-primary hover:underline text-sm mr-2">Xem</button>
                    <button className="text-red-500 hover:underline text-sm">Hủy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
