import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileSidebar({ links, open, close }) {
  const location = useLocation();
  return (
    <div className={`fixed inset-0 z-40 bg-black/30 md:hidden ${open ? "block" : "hidden"}`} onClick={close}>
      <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow" onClick={(e) => e.stopPropagation()}>
        <div className="mt-4 space-y-2">
          {links.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              onClick={close}
              className={`block px-6 py-2 text-sm hover:bg-gray-100 ${location.pathname === path ? "font-medium text-primary" : "text-gray-700"}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}