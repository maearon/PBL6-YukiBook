// LoginForm.jsx
"use client"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, BookOpen } from "lucide-react"
import { AuthContext } from "../../contexts/AuthContext"

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [localLoading, setLocalLoading] = useState(false)
  const navigate = useNavigate()
  const { user, isAuthLoading, login } = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLocalLoading(true)

    try {
      await login({ phone_number: phoneNumber, password })
      // Đọc lại user từ context/localStorage sau khi login thành công
      const storedUser = JSON.parse(localStorage.getItem("bookstore-user") || "{}")
      if (storedUser.role_id === 1) {
        navigate("/admin/dashboard")
      } else if (storedUser.role_id === 2) {
        navigate("/owner/dashboard")
      } else {
        navigate("/")
      }
    } catch (err) {
      console.error("Đăng nhập thất bại:", err)
    } finally {
      setLocalLoading(false)
    }
  }

  // Nếu auth đang khởi tạo (ví dụ kiểm tra token trong localStorage), có thể hiển thị loading toàn cục
  if (isAuthLoading) {
    return <div className="flex justify-center items-center h-screen">Đang kiểm tra phiên đăng nhập…</div>
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl border-none">
          {/* Header */}
          <div className="p-6 text-center border-b space-y-1">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-purple-100 p-3">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-purple-700">Đăng nhập</h2>
            <p className="text-gray-500">Đăng nhập để truy cập thư viện sách của bạn</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium">
                  Số điện thoại
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Nhập số điện thoại của bạn"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu của bạn"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 pr-10 border rounded-md focus:ring-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <a href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-md bg-purple-600 text-white font-medium disabled:opacity-50"
                disabled={localLoading}
              >
                {localLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="p-6 border-t space-y-4">
            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <a href="/register" className="font-medium text-purple-600 hover:text-purple-800">
                Đăng ký ngay
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">hoặc đăng nhập với</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-2 border rounded-md hover:bg-gray-50">Google</button>
              <button className="py-2 border rounded-md hover:bg-gray-50">Facebook</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
