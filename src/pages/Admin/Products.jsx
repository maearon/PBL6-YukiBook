import React from "react";
import AdminSidebar from "../../components/AdminSidebar";

// ⚡ Fake dữ liệu sản phẩm
const fakeProducts = [
  {
    id: 1,
    name: "Eloquent JavaScript",
    category: "Lập trình",
    shop: "Nhà sách Minh Châu",
    price: 120000,
  },
  {
    id: 2,
    name: "UI/UX Design Basics",
    category: "Thiết kế",
    shop: "Hiệu sách Sáng Tạo",
    price: 89000,
  },
];

export default function Products() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar Admin */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Quản lý sản phẩm</h1>
          <button className="rounded bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary-dark transition">
            + Thêm sản phẩm
          </button>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto rounded-lg bg-white shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Tên sản phẩm</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Danh mục</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Cửa hàng</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Giá</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {fakeProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.shop}</td>
                  <td className="px-4 py-3">{product.price.toLocaleString()}₫</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-primary hover:underline text-sm mr-2">Sửa</button>
                    <button className="text-red-500 hover:underline text-sm">Xóa</button>
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
