import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Mật khẩu không khớp!");
      return;
    }

    try {
      await register({
        fullname,
        phone_number: phoneNumber,
        email,
        password,
        retype_password: confirm,
        address: "Da Nang",
        role_id: 3,
        facebook_account_id: 0,
        google_account_id: 0,
        date_of_birth: "1990-01-01", // mặc định hoặc sửa sau
      });

      navigate("/");
    } catch (err) {
      setError("Đăng ký thất bại: " + err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-lg">
        <h2 className="text-center text-3xl font-bold text-primary">Đăng ký tài khoản</h2>

        {error && (
          <div className="rounded bg-red-100 p-2 text-center text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Họ và tên</label>
            <input
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Số điện thoại</label>
            <input
              type="text"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            Đăng ký
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-primary hover:underline">
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}
