import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../src/hooks/useAuth.js";
import { ShoppingCart } from "lucide-react";
import logo from "../assets/logo.svg";

export default function Header({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const kw = keyword.trim();
    if (kw) {
      navigate(`/viewcate?keyword=${encodeURIComponent(kw)}`);
      setKeyword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cart");
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Bookstore Logo" className="h-10 w-10 object-contain" />
          <span className="text-2xl font-bold text-primary">Bookstore</span>
        </Link>

        <nav className="hidden md:flex flex-1 justify-center gap-8 text-sm items-center">
          <Link to="/" className="hover:text-primary font-medium">Home</Link>
          <Link to="/shop" className="hover:text-primary font-medium">Shop</Link>
          <Link to="/viewcate" className="hover:text-primary font-medium">Categories</Link>
        </nav>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 mx-6 flex-1 max-w-md"
        >
          <input
            type="text"
            placeholder="Search books..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="btn-primary py-2 px-4 rounded-full"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary" />
            <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </Link>

          {user ? (
            <>
              {user.role_id === 1 && (
                <Link to="/admin/dashboard" className="text-sm text-blue-600 hover:underline font-medium">
                  Admin
                </Link>
              )}
              {user.role_id === 2 && (
                <Link to="/owner/dashboard" className="text-sm text-green-600 hover:underline font-medium">
                  Owner Dashboard
                </Link>
              )}
              <Link to="/account/profile" className="text-sm hover:text-primary font-medium">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn-primary py-2 px-4 rounded-full text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary py-2 px-4 rounded-full text-sm">
                Login
              </Link>
              <Link to="/register" className="hidden md:inline text-primary hover:underline text-sm">
                Register
              </Link>
            </>
          )}
        </div>

        <button onClick={toggleSidebar} className="md:hidden" aria-label="Open menu">
          <svg className="h-6 w-6" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
