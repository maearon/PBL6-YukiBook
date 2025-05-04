import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  
  return (
    <header className="fixed top-0 z-30 w-full bg-white/90 backdrop-blur shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <img src="/logo.svg" alt="logo" className="h-8 w-8" />
          Bookstore
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <Link to="/cart" className="hover:text-primary">Giỏ hàng</Link>
          {user ? (
            <>
              <Link to="/account/profile" className="hover:text-primary">Tài khoản</Link>
              <button onClick={logout} className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">Đăng xuất</button>
            </>
          ) : (
            <Link to="/login" className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">Đăng nhập</Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button onClick={toggleSidebar} className="md:hidden" aria-label="Menu">
          <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </header>
  );
}
