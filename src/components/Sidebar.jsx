import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ links, close }) {
  const location = useLocation();
  return (
    <aside className="hidden w-60 flex-shrink-0 border-r bg-white md:block">
      <div className="sticky top-14 h-[calc(100vh-56px)] overflow-y-auto pt-6">
        {links.map(({ label, path }) => (
          <Link
            key={path}
            to={path}
            className={`block px-6 py-2 text-sm hover:bg-gray-100 ${location.pathname === path ? "font-medium text-primary" : "text-gray-700"}`}
          >
            {label}
          </Link>
        ))}
        <button onClick={close} className="mt-8 w-full px-6 py-2 text-left text-sm text-red-500 hover:bg-red-50">Đăng xuất</button>
      </div>
    </aside>
  );
}