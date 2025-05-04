import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({
        phone_number: phoneNumber,
        password,
      });
  
      const storedUser = JSON.parse(localStorage.getItem("bookstore-user"));
  
      if (storedUser?.role_id === 1) {
        navigate("/admin/dashboard", { replace: true });
      } else if (storedUser?.role_id === 2) {
        navigate("/owner/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Đăng nhập thất bại:", err.message);
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-lg">
        <h2 className="text-center text-3xl font-bold text-primary">
          Đăng nhập
        </h2>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-primary hover:underline">
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
}
