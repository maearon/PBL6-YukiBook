import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Thống kê", path: "/owner/dashboard" },
  { name: "Sản phẩm", path: "/owner/products" },
  { name: "Đơn hàng", path: "/owner/orders" },
  { name: "Cửa hàng của tôi", path: "/owner/shop-info" },
];

export default function OwnerSidebar() {
  return (
    <aside className="w-full md:w-64 bg-white border-r min-h-screen shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary mb-8 text-center">
          Quản lý cửa hàng
        </h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
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
