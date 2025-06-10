import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Public/Home";
import BookDetail from "./pages/Public/BookDetail";
import Cart from "./pages/Public/Cart";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Unauthorized from "./pages/Public/Unauthorized";
import NotFound from "./pages/Public/NotFound";
import ShopDetail from "./pages/Public/ShopDetail";
import Profile from "./pages/Public/Profile";
import ShopList from "./pages/Public/shoplist";
import ViewCate from "./pages/Public/ViewCate";
// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminShops from "./pages/Admin/Shops";
import AdminProducts from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/Orders";
import AdminCate from "./pages/Admin/Categories"
// Owner Pages
import OwnerDashboard from "./pages/Owner/Dashboard";
import OwnerProducts from "./pages/Owner/Products";
import OwnerOrders from "./pages/Owner/Orders";
import ShopInfo from "./pages/Owner/ShopInfo";

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import Orders from "./pages/customer/Orders";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer"; // (nếu bạn có Footer)
import RequireAuth from "./routes/RequireAuth";

import MockChat from "./pages/chat/MockChat";
import ChatLayout from "./pages/chat/ChatLayout";
import CheckoutSuccess from "./pages/Public/CheckoutSuccess";
import Checkout from "./pages/Public/Checkout";

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header chỉ render nếu KHÔNG phải trang login hoặc register */}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header />
      )}

      {/* Nội dung trang */}
      <div className="flex-1 pt-10">
        <Routes>
          {/* Các Route giữ nguyên */}
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/mock-chat" element={<ChatLayout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/shops/:id" element={<ShopDetail />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/orders" element={<Orders />} />
          <Route path="/shop" element={<ShopList />} />
          <Route path="/viewcate" element={<ViewCate />} />


          <Route element={<RequireAuth allowedRoles={[3]} />}>
          </Route>

          <Route element={<RequireAuth allowedRoles={[2]} />}>
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/products" element={<OwnerProducts />} />
            <Route path="/owner/orders" element={<OwnerOrders />} />
            <Route path="/owner/shop-info" element={<ShopInfo />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/shops" element={<AdminShops />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/categories" element={<AdminCate />} />

          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Footer ẩn khi ở trang mock-chat */}
      {location.pathname !== "/mock-chat" && <Footer />}
    </div>
  );
}
