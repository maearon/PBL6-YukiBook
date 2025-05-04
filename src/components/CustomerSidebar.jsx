import React from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Hồ sơ cá nhân", path: "/account/profile" },
  { name: "Đơn hàng của tôi", path: "/account/orders" },
  { name: "Đổi mật khẩu", path: "/account/change-password" },
];

export default function CustomerSidebar() {
  return (
    <aside className="w-full md:w-64 bg-white border-r min-h-screen shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold text-primary mb-8 text-center">Tài khoản</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
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
