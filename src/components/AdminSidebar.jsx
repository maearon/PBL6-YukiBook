import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Tổng quan", path: "/admin/dashboard" },
  { name: "Người dùng", path: "/admin/users" },
  { name: "Cửa hàng", path: "/admin/shops" },
  { name: "Sản phẩm", path: "/admin/products" },
  { name: "Đơn hàng", path: "/admin/orders" },
  { name: "Danh mục", path: "/admin/categories" },
];

export default function AdminSidebar() {
  return (
    <aside className="w-full md:w-64 bg-white border-r min-h-screen shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">Quản trị Admin</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}